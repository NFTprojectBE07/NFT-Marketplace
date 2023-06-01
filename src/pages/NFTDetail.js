import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../components/base/Card";
import "../styles/NFTDetail.css";
import { ColorExtractor } from "react-color-extractor";
import Button from "../components/base/Button";
import { FaEthereum } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useMobile } from "../hooks/isMobile";
import { useARStatus } from "../hooks/isARStatus";
import { useEthers } from "@usedapp/core";

const NFTDetail = () => {
  const isMobile = useMobile();

  const [colors, setColors] = useState([]);
  const [isLike, setIsLike] = useState(false);

  const { activateBrowserWallet, account } = useEthers();
  // const etherBalance = useEtherBalance(account);

  const handleWallet = () => {
    activateBrowserWallet();
  };

  const like = () => setIsLike(!isLike);

  const getColors = (colors) => {
    setColors((c) => [...c, ...colors]);
  };

  // const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    setColors([]);
  }, [state]);

  const isARSupport = useARStatus(state.item.src);

  return (
    <div>
      <Header />
      <div id="nft-detail-card-wrapper">
        <Card
          width={isMobile ? "100%" : "65vw"}
          height={isMobile ? "700px" : "60vh"}
          blurColor={colors[0]}
          child={
            <div id="detail-content">
              {isARSupport ? (
                <model-viewer
                  ar-scale="auto"
                  ar
                  ar-modes="webxr scene-viewer quick-look"
                  id="arDetail"
                  loading="eager"
                  camera-controls
                  auto-rotate
                  src={state.item.src}
                ></model-viewer>
              ) : (
                <>
                  <ColorExtractor getColors={getColors}>
                    <img id="detail-image" src={state.item.src} alt="" />
                  </ColorExtractor>
                </>
              )}

              <div id="detail-info">
                <div id="detail-info-container">
                  <p id="collection">{state.item.name}</p>
                  <p id="name">{state.item.name}</p>
                  <p id="description">{state.item.description}</p>
                </div>

                <div id="detail-controls">
                  <Button
                    width={isMobile ? "70%" : "70%"}
                    height="50px"
                    child={
                      <div id="button-child">
                        <FaEthereum size="30px" />
                        <a href="https://portfolio.metamask.io/buy/payment-method"><p id="price">1254</p></a>
                        {/* <a href="https://portfolio.metamask.io/buy/payment-method"><button id="connect-wallet" onClick={handleWallet}>
                          {!account ? "Buy" : account}1234
                        </button></a> */}
                      </div>
                    }
                  ></Button>
                  <div className="like-container">
                    <button className="like" onClick={like}>
                      {!isLike ? (
                        <AiOutlineHeart size="45" color="white" />
                      ) : (
                        <AiFillHeart
                          size="45"
                          style={{
                            stroke: `-webkit-linear-gradient(
                              to bottom,
                              #38ef7d,
                              #11998e
                            )`,
                          }}
                          color="#00f5c966"
                        />
                      )}
                    </button>
                    <p className="like-count">123</p>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default NFTDetail;
