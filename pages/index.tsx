import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGlobalState } from "../components/GlobalStateProvider";

const Home: NextPage = () => {
  const [state, dispatch] = useGlobalState();
  const router = useRouter();

  useEffect(() => {
    if (state.id) {
      router.push("/home");
    }
  }, [state.id, router]);

  return (
    <div className="h-[79vh]">
      <div className="text-center py-[90px]">
        <h1 className="font-bold text-4xl text-primary">Study Fast and Easy</h1>
        <h3 className="px-3 py-7 font-medium text-gray-500">
          Learn and memorize anything you want with our reiterative learning activities.
        </h3>
        <div className="mt-10">
          <Link href="/home" passHref>
            <a>
              <button className="text-white font-semibold bg-green rounded-lg px-6 py-3 hover:opacity-75">
                Begin Studying
              </button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
