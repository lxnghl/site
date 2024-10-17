import { Agdasima } from "next/font/google";

const googleFont = Agdasima({
  weight: ['700'],
  subsets: ['latin']
})

export default function AboutPage() {
    return (
      <div className={`container mx-auto p-4`}>
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="mt-4 text-lg">
          Welcome to our blog! We are dedicated to providing you with the latest content on various topics.
        </p>
      </div>
    );
  }
  