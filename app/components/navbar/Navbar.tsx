"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import axios from "axios";
import "./Navbar.scss";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      console.log("🔹 Envoi des données utilisateur...");
      // Charger le thème depuis localStorage
      if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.add("dark");
        setDarkMode(true);
      }
      // Enregistrer le user connecté au chargement de la page
      axios
        .post("/api/user", {
          clerkId: user.id,
          firstName: user.firstName ?? "",
          lastName: user.lastName ?? "",
          email: user.primaryEmailAddress?.emailAddress ?? "",
          profilePicture: user.imageUrl ?? "",
        })
        .then((res) =>
          console.log("Bravo Utilisateur enregistré et sa valeur est: ====> :", res.data)
        )
        .catch((err) => console.error("Erreur API :", err));
    }
  }, [isLoaded, isSignedIn, user]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode.toString());
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-28 h-16 relative">
                <Image
                  src="/L3.png"
                  alt="Logo"
                  fill
                  className="cursor-pointer object-contain"
                />
              </div>
              <span className="-ml-3 text-2xl font-semibold dark:text-white">
                Blog
              </span>
            </Link>
          </div>

          {/* MENU (DESKTOP) */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <ul className="flex space-x-8">
              <li>
                <Link
                  href="/"
                  className={`text-gray-800 dark:text-white hover:text-blue-500 nav-item ${
                    pathname === "/" ? "active" : ""
                    }`}
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`nav-item text-gray-800 dark:text-white hover:text-blue-500  ${
                    pathname === "/about" ? "active" : ""
                    }`}
                >
                  A propos
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className={`text-gray-800 dark:text-white hover:text-blue-500 nav-item ${
                    pathname === "/projects" ? "active font-bold" : ""
                    }`}
                >
                  Projets
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`text-gray-800 dark:text-white hover:text-blue-500 nav-item ${
                    pathname === "/contact" ? "active font-bold" : ""
                    }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* BOUTONS (DARK MODE, SIGN-IN, USER) */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="text-gray-800 dark:text-white hover:text-blue-500"
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {isLoaded && !isSignedIn && (
              <Link
                href="/sign-in"
                className="text-gray-800 dark:text-white hover:text-blue-500"
              >
                Sign In
              </Link>
            )}

            {isLoaded && isSignedIn && <UserButton />}

            {/* BOUTON BURGER (MOBILE) */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-800 dark:text-white hover:text-blue-500"
              aria-label="Open main menu"
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* MENU (MOBILE) */}
        <div
          className={`${menuOpen ? "block" : "hidden"} md:hidden mt-4 pb-4`}
        >
          <ul className="flex flex-col space-y-4">
            <li>
              <Link
                href="/"
                className={`text-gray-800 dark:text-white hover:text-blue-500 ${
                  pathname === "/" ? "font-bold" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`text-gray-800 dark:text-white hover:text-blue-500 ${
                  pathname === "/about" ? "font-bold" : ""
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className={`text-gray-800 dark:text-white hover:text-blue-500 ${
                  pathname === "/projects" ? "font-bold" : ""
                }`}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`text-gray-800 dark:text-white hover:text-blue-500 ${
                  pathname === "/contact" ? "font-bold" : ""
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}




// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
// import "./Navbar.scss";
// import { usePathname } from "next/navigation";
// import { UserButton, useUser } from "@clerk/nextjs";
// import axios from "axios";


// export default function Navbar() {
// 	const [menuOpen, setMenuOpen] = useState(false);
// 	const [darkMode, setDarkMode] = useState(false);
// 	const pathname = usePathname();
// 	const { isLoaded, isSignedIn, user } = useUser();

 	
//   useEffect(() => {
//     if (isLoaded && isSignedIn && user) {
//       console.log("🔹 Envoi des données utilisateur...");
//       // Charger le thème depuis localStorage
//       if (localStorage.getItem("theme") === "dark") {
//         document.documentElement.classList.add("dark");
//         setDarkMode(true);
//       }
//       // Enregistrer le user connecté au chargement de la page
//       axios.post("/api/user", {
//         clerkId: user.id,
//         firstName: user.firstName ?? "",
//         lastName: user.lastName ?? "",
//         email: user.primaryEmailAddress?.emailAddress ?? "",
//         profilePicture: user.imageUrl ?? "",
//       })
// .then((res) => console.log("Bravo Utilisateur enregistré et sa valeur est: ====> :", res.data))
// .catch((err) => console.error("Erreur API :", err));

//     }
//   }, [isLoaded, isSignedIn, user]);

// 	const toggleMenu = () => setMenuOpen(!menuOpen);

// 	const toggleDarkMode = () => {
// 		setDarkMode(prev => {
// 			const newMode = !prev;
// 			localStorage.setItem("darkMode", newMode.toString());
// 			if (newMode) {
// 				document.documentElement.classList.add("dark");
// 			} else {
// 				document.documentElement.classList.remove("dark");
// 			}
// 			return newMode;
// 		});
// 	};

// 	return (
// 		<nav className="navbar w-100">
// 			<div className="container  flex items-center justify-between w-full ">
// 				{/* LOGO */}
// 				<div>
// 					<Link href="/" className="flex items-center ">
// 						<div className="w-28 h-16 relative">
// 							<Image
// 								src="/L3.png"
// 								alt="Logo"
// 								fill
// 								className="cursor-pointer object-contain"
// 							/>
// 						</div>
// 						<span className="-ml-3 text-2xl font-semibold dark:text-white">
// 							Blog
// 						</span>
// 						{/* <Image
// 							src="/logo.svg"
// 							alt="Flowbite Logo"
// 							width={32}
// 							height={32}
// 						/>
// 						<span className="text-2xl font-semibold dark:text-white">
// 							Flowbite
// 						</span> */}
// 					</Link>
// 				</div>

// 				<div className="flex items-center space-x-4">
// 					{/* BOUTON BURGER (MOBILE) */}
// 					<button
// 						onClick={toggleMenu}
// 						className="burger-btn md:hidden"
// 						aria-label="Open main menu"
// 					>
// 						{menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
// 					</button>
// 				</div>

// 				{/* MENU */}
// 				{isLoaded &&
// 					isSignedIn &&
// 					<div
// 						className={`nav-links ${menuOpen
// 							? "open"
// 							: "hidden"} md:flex md:items-center md:justify-center md:space-x-8`}
// 					>
// 						<ul className="flex flex-col md:flex-row md:space-x-8">
// 							<li>
// 								<Link
// 									href="/"
// 									className={`nav-item ${pathname === "/"
// 										? "active"
// 										: ""}`}
// 								>
// 									Home
// 								</Link>
// 							</li>
// 							<li>
// 								<Link
// 									href="/about"
// 									className={`nav-item ${pathname === "/about"
// 										? "active"
// 										: ""}`}
// 								>
// 									About
// 								</Link>
// 							</li>
// 							<li>
// 								<Link
// 									href="/projects"
// 									className={`nav-item ${pathname ===
// 									"/projects"
// 										? "active"
// 										: ""}`}
// 								>
// 									Projects
// 								</Link>
// 							</li>
// 							<li>
// 								<Link
// 									href="/contact"
// 									className={`nav-item ${pathname ===
// 									"/contact"
// 										? "active"
// 										: ""}`}
// 								>
// 									Contact
// 								</Link>
// 							</li>
// 							<li />
// 						</ul>
// 					</div>}
// 				<div>
// 					<div className="-ml-7 flex justify-center items-center ">
//             {/* TOGGLE DARK MODE AND SIGNIN*/}
            
// 						<button
// 							onClick={toggleDarkMode}
// 							className="theme-toggle mr-1 -ml-4"
// 						>
// 							{darkMode
// 								? <FiSun size={20} />
// 								: <FiMoon size={20} />}
//             </button>
//             <Link
// 							href={"/sign-in"}
// 							className="btn btn-sm md:btn-md btn-outline outline-none text-col1 hover:bg-col2 hover:text-col1 hover:border-none   "
// 						>
// 							Sign-in
// 						</Link>
//             {isLoaded && isSignedIn && <UserButton />}
						
// 						{/* <Link
// 							href={"/sign-up"}
// 							className="btn btn-sm md:btn-md outline-none ml-4 text-white1 bg-col1 hover:bg-col2 hover:text-col1"
// 						>
// 							Sign-up
// 						</Link> */}
						
// 					</div>
// 				</div>
// 			</div>
// 		</nav>
// 	);
// }


