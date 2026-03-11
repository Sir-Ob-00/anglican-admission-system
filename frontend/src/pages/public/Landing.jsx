import { useState } from "react";
import PublicNavbar from "../../components/layout/PublicNavbar";
import StaffSignInModal from "../../components/auth/StaffSignInModal";
import hero from "../../assets/images/anglican.webp";

export default function Landing() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-full bg-white">
      <PublicNavbar />

      <main className="mx-auto w-full max-w-[1400px] px-4 py-10 md:px-8 md:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-balance text-5xl font-extrabold leading-[1.02] tracking-tight text-slate-900 md:text-6xl">
              A Tradition of
              <br />
              Excellence in
              <br />
              Education
            </h1>

            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-slate-600">
              Discover a nurturing environment where students thrive academically, spiritually, and
              personally. Join our community.
            </p>

            <div className="mt-8">
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-7 text-base font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700"
                onClick={() => setOpen(true)}
              >
                Staff Sign In
              </button>
            </div>
          </div>

          <div className="lg:justify-self-end">
            <div className="overflow-hidden rounded-none border border-slate-200 bg-slate-50 shadow-sm md:rounded-sm">
              <img
                src={hero}
                alt="Students"
                className="aspect-[16/9] w-full max-w-[900px] object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </main>

      <StaffSignInModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
