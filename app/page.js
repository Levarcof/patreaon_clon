import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex text-white [@media(max-width:490px)]:ml-19 w-[90vw] mx-auto  flex-col h-[42vh] justify-center items-center gap-3">
        <div className="text-5xl flex  justify-center gap-2 items-center font-bold">
          Create and Earn
        </div>
        <p className="text-center">A crowdfunding platform for creators. Get founded by your fans and followers. Start now</p>
        <div className="flex">
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start here</button>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read more</button>
        </div>

      </div>

      <div className="bg-white  [@media(max-width:490px)]:w-130 h-1 opacity-10"></div>

      <div className="text-white [@media(max-width:490px)]:ml-16  w-[100vw]  my-16 mx-auto container">
        <h1 className=" text-center  mb-8 text-2xl font-bold">Your fans can  make you Star</h1>
        <div className="flex   md:justify-around">
          <div className="flex flex-col justify-center items-center">
            <img className="bg-slate-500 rounded-full p-2 " width={80} src="/man.gif" alt="" />
            <p className="mt-2 font-bold text-center">Fans want to help</p>
            <p className="text-center text-sm ">Your fans are available for you to help you</p>

          </div>
          <div className="flex flex-col justify-center items-center">
            <img className="bg-slate-500 rounded-full p-2 " width={80} src="/coin.gif" alt="" />
            <p className="mt-2 font-bold text-center">Fans want to help</p>
            <p className="text-center text-sm">Your fans are available for you to help you</p>

          </div>
          <div className="flex flex-col justify-center items-center">
            <img className="bg-slate-500 rounded-full p-2 " width={80} src="/group.gif" alt="" />
            <p className="mt-2 font-bold text-center">Fans want to help</p>
            <p className="text-center text-sm">Your fans are available for you to help you</p>

          </div>

        </div>
      </div>

      <div className="bg-white  [@media(max-width:490px)]:w-130 h-1 opacity-10"></div>

      <div className="text-white min-h-[30vh]  my-16  mx-auto container flex flex-col items-center justify-center">
        <div><h1 className=" text-center  mb-8 text-2xl font-bold">Learn more about us</h1></div>
        <iframe className="rounded-xl" width="550" height="315" src="https://www.youtube.com/embed/cMzulLA1_Hw?si=A0pp7BUiG5qcRWjG"  title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <div></div>
        

      </div>
    </>
  );
}
