"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import "./Navbar.scss";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [darkMode, setDarkMode] = useState(false);
	const pathname = usePathname();
	const { isLoaded, isSignedIn, user } = useUser();

	// Charger le thème depuis localStorage
	useEffect(() => {
		// if(user?.primaryEmailAddress?.emailAddress){
		//   checkAndAddUser(user?.primaryEmailAddress?.emailAddress)
		// }
		const storedTheme = localStorage.getItem("darkMode");
		if (storedTheme === "true") {
			setDarkMode(true);
			document.documentElement.classList.add("dark");
		}
	}, []);

	const toggleMenu = () => setMenuOpen(!menuOpen);

	const toggleDarkMode = () => {
		setDarkMode(prev => {
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
		<nav className="navbar">
			<div className="container max-w-screen-xl flex items-center justify-between mx-auto">
				{/* LOGO */}
				<div>
					<Link href="/" className="flex items-center ">
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
						{/* <Image
							src="/logo.svg"
							alt="Flowbite Logo"
							width={32}
							height={32}
						/>
						<span className="text-2xl font-semibold dark:text-white">
							Flowbite
						</span> */}
					</Link>
				</div>

				<div className="flex items-center space-x-4">
					{/* BOUTON BURGER (MOBILE) */}
					<button
						onClick={toggleMenu}
						className="burger-btn md:hidden"
						aria-label="Open main menu"
					>
						{menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
					</button>
				</div>

				{/* MENU */}
				{isLoaded &&
					isSignedIn &&
					<div
						className={`nav-links ${menuOpen
							? "open"
							: "hidden"} md:flex md:items-center md:justify-center md:space-x-8`}
					>
						<ul className="flex flex-col md:flex-row md:space-x-8">
							<li>
								<Link
									href="/"
									className={`nav-item ${pathname === "/"
										? "active"
										: ""}`}
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									href="/about"
									className={`nav-item ${pathname === "/about"
										? "active"
										: ""}`}
								>
									About
								</Link>
							</li>
							<li>
								<Link
									href="/preojects"
									className={`nav-item ${pathname ===
									"/abservicesout"
										? "active"
										: ""}`}
								>
									Projects
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className={`nav-item ${pathname ===
									"/contact"
										? "active"
										: ""}`}
								>
									Contact
								</Link>
							</li>
							<li />
						</ul>
					</div>}
				<div>
					<div className="flex justify-center items-center md:mr-8 ">
						{/* TOGGLE DARK MODE AND SIGNIN*/}
						<button
							onClick={toggleDarkMode}
							className="theme-toggle mt-2 mr-4"
						>
							{darkMode
								? <FiSun size={20} />
								: <FiMoon size={20} />}
						</button>
						<Link
							href={"/sign-in"}
							className="btn btn-sm md:btn-md btn-outline outline-none text-col1 hover:bg-col2 hover:text-col1 hover:border-none md:mr-4 "
						>
							Sign-in
						</Link>
						{/* <Link
							href={"/sign-up"}
							className="btn btn-sm md:btn-md outline-none ml-4 text-white1 bg-col1 hover:bg-col2 hover:text-col1"
						>
							Sign-up
						</Link> */}
						{isLoaded && isSignedIn && <UserButton />}
					</div>
				</div>
			</div>
		</nav>
	);
}

// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
// import Image from "next/image";
// import "../navbar/Navbar.scss"; // Import du fichier SCSS
// import { usePathname } from "next/navigation";

// export default function Navbar() {
// 	const [menuOpen, setMenuOpen] = useState(false);
// 	const [darkMode, setDarkMode] = useState(false);
// 	const pathname = usePathname();

// 	// Basculer le menu mobile
// 	const toggleMenu = () => setMenuOpen(!menuOpen);

// 	// Activer/Désactiver le mode sombre
// 	const toggleDarkMode = () => {
// 		setDarkMode(!darkMode);
// 		if (!darkMode) {
// 			document.documentElement.classList.add("dark");
// 			localStorage.setItem("theme", "dark");
// 		} else {
// 			document.documentElement.classList.remove("dark");
// 			localStorage.setItem("theme", "light");
// 		}
// 	};

// 	// Appliquer le mode sombre au chargement
// 	useEffect(() => {
// 		if (localStorage.getItem("theme") === "dark") {
// 			document.documentElement.classList.add("dark");
// 			setDarkMode(true);
// 		}
// 	}, []);

// 	return (
// 		<nav className="navbar w-full bg-white dark:bg-gray-900 shadow-md">
// 			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
// 				{/* LOGO */}
// 				<Link href="/" className="flex items-center">
// 					<div className="w-28 h-16 relative">
// 						<Image
// 							src="/L3.png"
// 							alt="Logo"
// 							fill
// 							className="cursor-pointer object-contain"
// 						/>
// 					</div>
// 					<span className="-ml-3 text-2xl font-semibold dark:text-white">
// 						Blog
// 					</span>
// 				</Link>

// 				{/* Bouton Burger (mobile) */}
// 				<button
// 					onClick={toggleMenu}
// 					className="p-2 text-gray-500 rounded-lg md:hidden hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
// 				>
// 					{menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
// 				</button>

// 				{/* Menu (visible ou caché en mobile) */}
// 				<div
// 					className={`${menuOpen
// 						? "block"
// 						: "hidden"} md:flex md:items-center md:w-auto`}
// 				>
// 					<ul className="nav-links">
// 						<li>
// 							<Link
// 								href="/"
// 								className={`nav-item ${pathname === "/"
// 									? "active"
// 									: ""}`}
// 							>
// 								Home
// 							</Link>
// 						</li>
// 						<li>
// 							<Link
// 								href="/about"
// 								className={`nav-item ${pathname === "/about"
// 									? "active"
// 									: ""}`}
// 							>
// 								About
// 							</Link>
// 						</li>
// 						<li>
// 							<Link
// 								href="/services"
// 								className={`nav-item ${pathname === "/services"
// 									? "active"
// 									: ""}`}
// 							>
// 								Services
// 							</Link>
// 						</li>
// 						<li>
// 							<Link
// 								href="/pricing"
// 								className={`nav-item ${pathname === "/pricing"
// 									? "active"
// 									: ""}`}
// 							>
// 								Pricing
// 							</Link>
// 						</li>
// 						<li>
// 							<Link
// 								href="/contact"
// 								className={`nav-item ${pathname === "/contact"
// 									? "active"
// 									: ""}`}
// 							>
// 								Contact
// 							</Link>
// 						</li>
// 					</ul>

// 					{/* Bouton Dark Mode */}
// 					<button
// 						onClick={toggleDarkMode}
// 						className="ml-4 p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
// 					>
// 						{darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
// 					</button>
// 				</div>
// 			</div>
// 		</nav>
// 	);
// }
