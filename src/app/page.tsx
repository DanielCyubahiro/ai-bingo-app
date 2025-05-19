import BingoBoard from '@/components/BingoBoard';

export default function Home() {
  return (
      <main
          className="min-h-screen flex flex-col items-center justify-center bg-[#57290a] bg-[url('/images/background.png')] bg-center text-center">
        <BingoBoard/>
      </main>
  );
}