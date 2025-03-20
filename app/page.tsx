"use client";
import Navbar from "./components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import PostItem from "../app/components/posts/PostItem";
import { Post } from "../type";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function Home() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await axios.get("/api/display");
				console.log("Contenu de response ===>", response);

				setPosts(response.data);
			} catch (error) {
				console.error(
					"Erreur lors de la récupération des posts :",
					error
				);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);

	if (loading) {
		return (
			<div>
				<Navbar />
				Chargement des posts...
			</div>
		);
	}
	return <div>
			<Navbar />

			<div className="flex max-w-4xl mx-auto px-4 pt-24 pb-8 justify-between">
				<h1 className="text-3xl font-bold mb-6">Liste des Posts</h1>
				<Link href="/dashboard/create-post" className="btn btn-sm md:btn-md btn-outline outline-none text-col1 hover:bg-col2 hover:text-col1 hover:border-none md:mr-4">
					Creer un post <Plus />
				</Link>
			</div>
			<div className="pl-4 pr-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{posts.length > 0 ? posts.map(post =>
							<PostItem key={post._id} post={post} />
						) : <div>
							Aucun post disponible (Creer un compte pour voir
							les articles).
						</div>}
			</div>
		</div>;
}
