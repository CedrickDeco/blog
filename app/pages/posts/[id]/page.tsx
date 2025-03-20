"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Post } from "../../../../type";
import Navbar from "../../../components/navbar/Navbar";
import { use } from "react";
import Link from "next/link";

// Définir les types pour les props
interface PostPageProps {
	params: Promise<{
		id: string;
	}>;
}

const PostPage = ({ params }: PostPageProps) => {
	const { id } = use(params); // Utilisez `use` pour accéder à `params.id`
	const [post, setPost] = useState<Post | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(
		() => {
			const fetchPost = async () => {
				if (id) {
					try {
						const response = await axios.get(`/api/posts/${id}`);
						console.log(
							"Contenu de response en fonction de son id ====>",
							response
						);
						setPost(response.data);
					} catch (error) {
						console.error(
							"Erreur lors de la récupération du post :",
							error
						);
					} finally {
						setLoading(false);
					}
				}
			};

			fetchPost();
		},
		[id]
	);

	if (loading) {
		return <div>Chargement...</div>;
	}

	if (!post) {
		return <div>Post non trouvé</div>;
	}

	return (
		<div>
			<Navbar />
			<div className="max-w-4xl mx-auto p-4">
				<h1 className="text-3xl font-bold mt-16 mb-6">
					{post.title}
				</h1>
				{post.imagePath &&
					<img
						src={post.imagePath}
						alt={post.title}
						className="mt-4 rounded-lg w-full h-48 object-contain"
					/>}
				<p className="text-gray-700 mt-4">
					{post.content}
				</p>
				<div className="mt-2 text-sm text-gray-500 flex justify-between">
					<span className="font-medium">
						Auteur: {post.authorName}
					</span>
					<span className="italic">
						Publié le{" "}
						{new Date(post.createdAt).toLocaleDateString("fr-FR")}
					</span>
				</div>
				<Link
					href="/"
					className="text-gray-800 dark:text-white hover:text-blue-500"
				>
					Retour
				</Link>
			</div>
		</div>
	);
};

export default PostPage;
