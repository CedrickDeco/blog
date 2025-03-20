"use client"; 

import { useState, useEffect, useRef } from "react"; // Pour gérer les états
import { useUser } from "@clerk/nextjs"; // Pour récupérer l'utilisateur connecté
import { FileInput, TextInput, Button, Select } from "flowbite-react"; // Composants UI de Flowbite
import { useRouter } from "next/navigation"; // Pour la redirection
import axios from "axios"; // Pour les requêtes HTTP
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";



const CreatePost = () => {
  const { user } = useUser(); // Récupère l'utilisateur connecté
  const router = useRouter(); // Pour la redirection

  // États pour gérer les champs du formulaire
  const [title, setTitle] = useState<string>(""); 
  const [content, setContent] = useState<string>(""); 
  const [category, setCategory] = useState<string>("uncategorized");
  const [file, setFile] = useState<File | null>(null); 
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Pour l'aperçu de l'image
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (fileInputRef.current) {
      // Trouvez le bouton à l'intérieur du FileInput
      const button = fileInputRef.current.querySelector("button");
      if (button) {
        console.log("valeur de button===>", button);
        
        button.textContent = "Choisir une image"; // Changez le texte du bouton
      }
    }
  }, []);

  // Gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setLoading(true); 

    try {
      let imagePath = ""; 

      if (file) {
        const formData = new FormData(); 
        formData.append("file", file); 

        const uploadResponse = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Spécifie le type de contenu
          },
        });
        imagePath = uploadResponse.data.imagePath; 
      }

      // Envoyer les données du post à l'API
      const postData = {
        title,
        content,
        imagePath,
        category,
        authorId: user?.id, 
      };

      await axios.post("/api/posts", postData); 
      toast.success("Le post a été créé avec succès !");

      // Vider les champs du formulaire
      setTitle("");
      setContent("");
      setCategory("uncategorized");
      setFile(null);
      setImagePreview(null);

      router.push("/dashboard/create-post");
    } catch (error) {
      console.error("Erreur lors de la création du post :", error); 
    } finally {
      setLoading(false); 
    }
  };

  // Gérer le chargement de fichier pour afficher l'aperçu de l'image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile); 

      // Crée une URL pour l'aperçu de l'image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null); // Réinitialise l'aperçu si aucun fichier n'est sélectionné
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Créer un nouveau post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          type="text"
          placeholder="Titre du post"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Met à jour le titre
          required
        />

        {/* Textarea pour le contenu */}
        <textarea
          placeholder="Entrer le contenu..."
          value={content}
          onChange={(e) => setContent(e.target.value)} // Met à jour le contenu
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={10}
          required
        />

        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)} // Met à jour la catégorie
        >
          <option value="uncategorized">Selectionner une catégorie</option>
          <option value="javascript">JavaScript</option>
          <option value="reactjs">React.js</option>
          <option value="nextjs">Next.js</option>
        </Select>

        {/* Aperçu de l'image */}
        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Aperçu de l'image"
              className="rounded-lg w-64 h-52"
            />
          </div>
        )}

        <div className="flex flex-col space-y-2">
          <label className="bg-col1 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 text-center">
            Choisir une image
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden" // Cache l'input par défaut
            />
          </label>
        </div>
        
         
        <Button
          type="submit"
          disabled={loading}
          className="btn btn-sm md:btn-md btn-outline outline-none text-col1 hover:bg-col2 hover:text-col1 hover:border-none md:mr-4"
        >
          {loading ? "Création en cours..." : "Créer le post"}
        </Button>
        <Link href="/" className="btn btn-sm md:btn-md btn-outline outline-none text-col1 hover:bg-col2 hover:text-col1 hover:border-none md:mr-4">
					Retour 
				</Link>
      </form>
    </div>
  );
};

export default CreatePost;