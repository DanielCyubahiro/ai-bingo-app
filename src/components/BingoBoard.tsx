'use client';

import React, {useCallback, useEffect, useState} from 'react';
import {movieTropes} from '@/data/tropes';
import fireworksAnimation from '@/animations/fireworks.json';
import bingoAnimation from '@/animations/bingo.json';
import Button from './Button';
import dynamic from 'next/dynamic';
import LottieAnimation from './LottieAnimation';

const DynamicFireworks = dynamic(() => Promise.resolve(LottieAnimation), {
  ssr: false,
});

const DynamicBingo = dynamic(() => Promise.resolve(LottieAnimation), {
  ssr: false,
});

const WINNING_LINES = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
];

const BingoBoard = () => {
  const [board, setBoard] = useState<string[]>([]);
  const [markedCards, setMarkedCards] = useState<number[]>([12]);
  const [completedWinningLines, setCompletedWinningLines] = useState<number[]>(
      []);
  const [winCount, setWinCount] = useState(0);
  const [animateWin, setAnimateWin] = useState(false);
  const [showFireworksAnimation, setShowFireworksAnimation] = useState(false);
  const [showBingoAnimation, setShowBingoAnimation] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const generateBoard = useCallback(() => {
    const shuffledTropes = [...movieTropes].sort(() => 0.5 - Math.random());
    shuffledTropes.splice(12, 0, 'Movie time');
    return shuffledTropes.slice(0, 25);
  }, []);

  useEffect(() => {
    setBoard(generateBoard());
  }, [generateBoard]);

  const toggleCard = useCallback((index: number) => {
    if (index === 12) return;
    setMarkedCards((prevMarked) =>
        prevMarked.includes(index)
            ? prevMarked.filter((i) => i !== index)
            : [...prevMarked, index],
    );
  }, []);

  const updateWins = useCallback((currentMarkedCards: number[]) => {
    const newlyCompletedLines = WINNING_LINES.filter((line, index) =>
        line.every((i) => currentMarkedCards.includes(i)) &&
        !completedWinningLines.includes(index),
    );
    const lostLines = completedWinningLines.filter((lineIndex) =>
        !WINNING_LINES[lineIndex].every((i) => currentMarkedCards.includes(i)),
    );

    if (newlyCompletedLines.length > 0 || lostLines.length > 0) {
      setCompletedWinningLines((prev) => [
        ...prev.filter((lineIndex) => !lostLines.includes(lineIndex)),
        ...newlyCompletedLines.map((line) => WINNING_LINES.indexOf(line)),
      ]);

      setWinCount((prevWinCount) => prevWinCount + newlyCompletedLines.length -
          lostLines.length);

      if (newlyCompletedLines.length > 0) {
        setAnimateWin(true);
        setTimeout(() => setAnimateWin(false), 500);

        setShowBingoAnimation(true);
        setTimeout(() => {
          setShowBingoAnimation(false);
        }, 1700);
      }
    }
  }, [completedWinningLines]);

  useEffect(() => {
    updateWins(markedCards);
  }, [markedCards, updateWins]);

  useEffect(() => {
    if (winCount > 0 && markedCards.length === 25) {
      setShowFireworksAnimation(true);
      setTimeout(() => {
        setShowFireworksAnimation(false);
        setShowReset(true);
      }, 5000);
    }
  }, [winCount, markedCards]);

  const resetGame = useCallback(() => {
    setBoard(generateBoard());
    setMarkedCards([12]);
    setCompletedWinningLines([]);
    setWinCount(0);
    setShowReset(false);
  }, [generateBoard]);

  return (
      <>
        <div
            className="bg-[#F5F5DC] px-4 py-1 rounded-2xl shadow-lg inline-block mb-[3%]">
          <h1 className="text-[4vw] text-transparent bg-clip-text bg-gradient-to-r from-[#FFCC00] to-[#FF5E00] tracking-wider text-shadow-lg">
            📽️Movie Bingo📽️
          </h1>
        </div>

        <div
            className={`grid grid-cols-5 gap-2 p-[1.5%] rounded-2xl shadow-lg bg-opacity-50 bg-[rgba(201,173,127,0.5)] bg-[url('/images/cardBackground.png')] bg-center w-[90vmin] h-[80vmin] max-w-full max-h-full mx-auto ${showReset
                ? 'pointer-events-none opacity-50'
                : ''}`}>
          {board.map((trope, index) => (
              <div
                  key={index}
                  className={`flex justify-center items-center w-[16vmin] h-[13vmin] rounded-lg shadow-md cursor-pointer transition-all duration-300 text-center uppercase mx-auto overflow-hidden
              ${markedCards.includes(index)
                      ? 'bg-gradient-to-br from-[#4CAF50] to-[#A18560] text-white line-through shadow-lg'
                      : 'bg-gradient-to-br from-[#F5F5DC] to-[#D2B48C] text-[#333]'}
              ${index === 12
                      ? 'bg-gradient-to-br from-[#D2B48C] to-[#A18560] text-[#FFD700] text-shadow-md relative'
                      : ''}
              hover:scale-105 hover:shadow-xl ${index === 12
                      ? 'hover:transform-none'
                      : ''}
            `}
                  onClick={() => toggleCard(index)}
              >
                {index === 12 ? (
                    <span
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[3vw]">🍿</span>
                ) : trope}
              </div>
          ))}
        </div>

        <div
            className={`bg-[#F5F5DC] px-4 py-1 rounded-2xl shadow-lg inline-block mt-[2%] ${animateWin
                ? 'animate-[winAnimation_0.5s_ease-out]'
                : ''}`}>
          <h2 className="text-[2vw] text-[#4CAF50]">Bingos: {winCount}</h2>
        </div>

        {showBingoAnimation && (
            <div
                className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-[1000]">
              <DynamicBingo animationData={bingoAnimation} loop={false}/>
            </div>
        )}
        {showFireworksAnimation && (
            <div
                className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-[1000]">
              <DynamicFireworks animationData={fireworksAnimation}/>
            </div>
        )}

        {showReset && <Button onClick={resetGame}>Play again</Button>}
      </>
  );
};

export default BingoBoard;