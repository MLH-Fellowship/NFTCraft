import type { NextPage } from 'next';
import { useState, createRef } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import {
	DrawCanvasColorDrawer,
	DrawCanvasContainer,
	DrawCanvasToolbarContainer,
	DrawCanvasToolBox,
	DrawMain,
	DrawCanvasToolBoxButton,
	MintButton,
	ColorItem,
} from './../styles/Draw/styles';
import {
	ReactSketchCanvas,
	ReactSketchCanvasRef,
	ReactSketchCanvasProps,
} from 'react-sketch-canvas';
import Arweave from 'arweave';
import { actions, Connection } from '@metaplex/js';

const Draw: NextPage = () => {
	const [canvasProps, setCanvasProps] = useState<
		Partial<ReactSketchCanvasProps>
	>({
		width: '100%',
		height: '100%',
		preserveBackgroundImageAspectRatio: 'none',
		strokeWidth: 4,
		eraserWidth: 5,
		strokeColor: '#fff',
		canvasColor: '#000000',
		style: {
			borderRadius: '5px',
			overflow: 'hidden',
			border: '2px solid #333',
		},
		exportWithBackgroundImage: true,
		withTimestamp: true,
		allowOnlyPointerType: 'all',
	});
	const [currentSelectedTBItem, setCurrentSelectedTBItem] =
		useState<string>('');
	const [currentSelectedTColor, setCurrentSelectedColor] =
		useState<string>('');
	const canvasRef = createRef<ReactSketchCanvasRef>();
	const [walletAddress, setWalletAddress] = useState(null);
	const [metaURL, setMetaURL] = useState('');

	// Canvas Handlers
	const onPenHandler = () => {
		canvasRef.current.eraseMode(false);
	};

	const onEraserHandler = () => {
		canvasRef.current.eraseMode(true);
	};

	const onClearCanvasHandler = () => {
		canvasRef.current.resetCanvas();
	};

	const onUndoHandler = () => {
		canvasRef.current.undo();
	};

	const onRedoHandler = () => {
		canvasRef.current.redo();
	};

	const onGetCanvasImageHandler = () => {
		if (!walletAddress) {
			connectWallet();
			// return;
		}

    // * ADD wallet here

		const arweave = Arweave.init({
			host: 'arweave.net',
			port: 443,
			protocol: 'https',
			timeout: 20000,
			logging: false,
		});
		canvasRef.current
			.exportImage('png')
			.then((data) => {
				console.log(data);
				fetch(data)
					.then((res) => res.blob())
					.then(async (blob) => {
						let file = '';
						let reader = new FileReader();
						reader.readAsArrayBuffer(blob);

						reader.onload = async function () {
							if (reader.result) {
								file = Buffer.from(reader.result);
								console.log('---uploading image to arweave---');
								const transaction =
									await arweave.createTransaction(
										{
											data: file,
										},
										wallet
									);

								transaction.addTag('Content-Type', 'image/png');

								await arweave.transactions.sign(
									transaction,
									wallet
								);

								const response =
									await arweave.transactions.post(
										transaction,
										wallet
									);
								// console.log(response);

								const id = transaction.id;
								const imageUrl = id
									? `https://arweave.net/${id}`
									: undefined;
								console.log('imageUrl', imageUrl);

								console.log('---image upload finished ---');


								//  *  Upload metadata to Arweave

								const metadata = {
									name: 'Custom NFT #1',
									symbol: 'CNFT',
									description:
										'A description about my custom NFT #1',
									seller_fee_basis_points: 500,
									external_url: 'https://www.customnft.com/',
									attributes: [
										{
											trait_type: 'NFT type',
											value: 'Custom',
										},
									],
									collection: {
										name: 'Test Collection',
										family: 'Custom NFTs',
									},
									properties: {
										files: [
											{
												uri: imageUrl,
												type: 'image/png',
											},
										],
										category: 'image',
										maxSupply: 0,
										creators: [
											{
												address: walletAddress, // usesrs public address
												share: 100,
											},
										],
									},
									image: imageUrl,
								};

								const metadataRequest =
									JSON.stringify(metadata);

								console.log(
									'---uploading metadata to arweave---'
								);

								const metadataTransaction =
									await arweave.createTransaction(
										{
											data: metadataRequest,
										},
										wallet
									);

								metadataTransaction.addTag(
									'Content-Type',
									'application/json'
								);

								await arweave.transactions.sign(
									metadataTransaction,
									wallet
								);

								console.log(
									'metadata txid',
									metadataTransaction.id
								);

								console.log(
									await arweave.transactions.post(
										metadataTransaction
									)
								);
								const metaURL = metadataTransaction.id
									? `https://arweave.net/${metadataTransaction.id}`
									: undefined;
								console.log('metaURL', metaURL);
								setMetaURL(metaURL);
								console.log(
									'---metadata upload finished 🚀 🚀 ---'
								);

								// * mint NFT
								await mint(metaURL);
							}
						};
					});
			})
			.catch((e) => {
				console.log(e);
			});
	};


	const connectWallet = async () => {
		const { solana } = window;

		if (solana) {
			const response = await solana.connect();
			console.log(response, solana);
			console.log(
				'Connected with Public Key:',
				response.publicKey.toString()
			);
			setWalletAddress(response.publicKey.toString());
		}
	};
	const mint = async (meta: string) => {
		console.log('---minting NFT---');
		const connection = new Connection('devnet');
		const { solana } = window;
		console.log('meta url is coming from mint --->', meta, solana);

		const mintNFTResponse = await actions.mintNFT({
			connection,
			wallet: solana,
			uri: `${meta}`,
			maxSupply: 1,
		});
		console.log(mintNFTResponse);
		console.log('---NFT minted sucessfully 🟢---');
	};

	const onChangePenColor = (color: string) => {
		if (color) {
			setCanvasProps((prev) => ({
				...prev,
				strokeColor: color,
			}));
		}
	};

	return (
		<div>
			<Head>
				<title>NFTCraft</title>
				<meta
					name='description'
					content='Draw your NFT and mint them'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<DrawMain>
				<Header />
				<DrawCanvasContainer>
					<ReactSketchCanvas
						ref={canvasRef}
						width='600'
						height='400'
						strokeWidth={4}
						strokeColor='red'
						{...canvasProps}
					/>
				</DrawCanvasContainer>
				<DrawCanvasToolbarContainer>
					<DrawCanvasToolBox>
						<DrawCanvasToolBoxButton
							bg='#78e0dc'
							boxColor='#2dc5bf'
							onClick={onPenHandler}
						>
							Pen
						</DrawCanvasToolBoxButton>
						<DrawCanvasToolBoxButton
							bg='#b8b3e9'
							boxColor='#6e64d2'
							onClick={onEraserHandler}
						>
							Eraser
						</DrawCanvasToolBoxButton>
						<DrawCanvasToolBoxButton
							bg='#fde74c'
							boxColor='#e0c503'
							onClick={onUndoHandler}
						>
							Undo
						</DrawCanvasToolBoxButton>
						<DrawCanvasToolBoxButton
							bg='#f14579'
							boxColor='#900c3e'
							onClick={onRedoHandler}
						>
							Redo
						</DrawCanvasToolBoxButton>
						<DrawCanvasToolBoxButton
							bg='#97fb98'
							boxColor='#2d8b57'
							onClick={onClearCanvasHandler}
						>
							Clear
						</DrawCanvasToolBoxButton>
					</DrawCanvasToolBox>
					<MintButton onClick={onGetCanvasImageHandler}>
						Mint
					</MintButton>
					<MintButton onClick={connectWallet}>
						Connect Wallet
					</MintButton>
					<DrawCanvasColorDrawer>
						<ColorItem
							bg='#78e0dc'
							onClick={() => onChangePenColor('#78e0dc')}
						/>
						<ColorItem
							bg='#6e64d2'
							onClick={() => onChangePenColor('#6e64d2')}
						/>
						<ColorItem
							bg='#fde74c'
							onClick={() => onChangePenColor('#fde74c')}
						/>
						<ColorItem
							bg='#f14579'
							onClick={() => onChangePenColor('#f14579')}
						/>
						<ColorItem
							bg='#97fb98'
							onClick={() => onChangePenColor('#97fb98')}
						/>
						<ColorItem
							bg='#ffffff'
							onClick={() => onChangePenColor('#ffffff')}
						/>
					</DrawCanvasColorDrawer>
				</DrawCanvasToolbarContainer>
			</DrawMain>
		</div>
	);
};

export default Draw;
