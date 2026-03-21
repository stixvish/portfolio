import RandomGallery from "@/components/RandomGallery";

export const dynamic = "force-dynamic";

export default function Home() {

  return (
    <main className="flex min-h-dvh items-center justify-center">
      <RandomGallery />
      <div className="text-center relative z-10">
        <div className="leading-tight">
          <h1 className="text-hero -translate-x-8">hello there!</h1>
          <h1 className="text-hero translate-x-8">i&apos;m vishesh.</h1>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 mt-4">
          <p className="text-body">software engineer</p>
          <p className="text-body hidden md:block">&middot;</p>
          <p className="text-body">computer science student</p>
          <p className="text-body hidden md:block">&middot;</p>
          <p className="text-body">eager to learn</p>
        </div>
      </div>
    </main>
  );
}
