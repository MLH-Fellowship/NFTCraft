import type { NextPage } from "next";
import { useState, createRef } from "react";
import Head from "next/head";
import Header from "../components/Header";
import {
  DrawCanvasColorDrawer,
  DrawCanvasContainer,
  DrawCanvasToolbarContainer,
  DrawCanvasToolBox,
  DrawMain,
  DrawCanvasToolBoxButton,
  MintButton,
  ColorItem,
} from "./../styles/Draw/styles";
import {
  ReactSketchCanvas,
  ReactSketchCanvasRef,
  ReactSketchCanvasProps,
} from "react-sketch-canvas";

const Draw: NextPage = () => {
  const [canvasProps, setCanvasProps] = useState<
    Partial<ReactSketchCanvasProps>
  >({
    width: "100%",
    height: "100%",
    preserveBackgroundImageAspectRatio: "none",
    strokeWidth: 4,
    eraserWidth: 5,
    strokeColor: "#fff",
    canvasColor: "#000000",
    style: {
      borderRadius: "5px",
      overflow: "hidden",
      border: "2px solid #333",
    },
    exportWithBackgroundImage: true,
    withTimestamp: true,
    allowOnlyPointerType: "all",
  });
  const [currentSelectedTBItem, setCurrentSelectedTBItem] =
    useState<string>("");
  const [currentSelectedTColor, setCurrentSelectedColor] = useState<string>("");
  const canvasRef = createRef<ReactSketchCanvasRef>();

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
    canvasRef.current
      .exportImage("png")
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
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
        <meta name="description" content="Draw your NFT and mint them" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DrawMain>
        <Header />
        <DrawCanvasContainer>
          <ReactSketchCanvas
            ref={canvasRef}
            width="600"
            height="400"
            strokeWidth={4}
            strokeColor="red"
            {...canvasProps}
          />
        </DrawCanvasContainer>
        <DrawCanvasToolbarContainer>
          <DrawCanvasToolBox>
            <DrawCanvasToolBoxButton
              bg="#78e0dc"
              boxColor="#2dc5bf"
              onClick={onPenHandler}
            >
              Pen
            </DrawCanvasToolBoxButton>
            <DrawCanvasToolBoxButton
              bg="#b8b3e9"
              boxColor="#6e64d2"
              onClick={onEraserHandler}
            >
              Eraser
            </DrawCanvasToolBoxButton>
            <DrawCanvasToolBoxButton
              bg="#fde74c"
              boxColor="#e0c503"
              onClick={onUndoHandler}
            >
              Undo
            </DrawCanvasToolBoxButton>
            <DrawCanvasToolBoxButton
              bg="#f14579"
              boxColor="#900c3e"
              onClick={onRedoHandler}
            >
              Redo
            </DrawCanvasToolBoxButton>
            <DrawCanvasToolBoxButton
              bg="#97fb98"
              boxColor="#2d8b57"
              onClick={onClearCanvasHandler}
            >
              Clear
            </DrawCanvasToolBoxButton>
          </DrawCanvasToolBox>
          <MintButton>Mint</MintButton>
          <DrawCanvasColorDrawer>
            <ColorItem
              bg="#78e0dc"
              onClick={() => onChangePenColor("#78e0dc")}
            />
            <ColorItem
              bg="#6e64d2"
              onClick={() => onChangePenColor("#6e64d2")}
            />
            <ColorItem
              bg="#fde74c"
              onClick={() => onChangePenColor("#fde74c")}
            />
            <ColorItem
              bg="#f14579"
              onClick={() => onChangePenColor("#f14579")}
            />
            <ColorItem
              bg="#97fb98"
              onClick={() => onChangePenColor("#97fb98")}
            />
            <ColorItem
              bg="#ffffff"
              onClick={() => onChangePenColor("#ffffff")}
            />
          </DrawCanvasColorDrawer>
        </DrawCanvasToolbarContainer>
      </DrawMain>
    </div>
  );
};

export default Draw;
