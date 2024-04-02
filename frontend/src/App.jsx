import React, { useState } from "react";
import axios from "axios";
import "./main.css";

const sampleData = [
	{
		color: "red",
		value: 12,
	},
	{
		color: "green",
		value: 2342,
	},
	{
		color: "blue",
		value: 33,
	},
	{
		color: "cyan",
		value: 463,
	},
	{
		color: "magenta",
		value: 3444,
	},
	{
		color: "yellow",
		value: 56,
	},
	{
		color: "black",
		value: 560,
	},
];

function App() {
	const [selectedImage, setSelectedImage] = useState(null);
	const [processedData, setProcessedData] = useState([]);

	const handleImageChange = (event) => {
		const imageFile = event.target.files[0];
		if (!imageFile) return;

		const reader = new FileReader();
		reader.readAsDataURL(imageFile);
		reader.onloadend = () => {
			setSelectedImage(reader.result);
		};
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("image", selectedImage);

		axios
			.post("http://localhost:3000/process-image", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				setProcessedData(response.data);
			})
			.catch((error) => {
				console.error("Error processing image:", error);
			});
	};

	const render = sampleData.map((item, index) => {
		if (item.value > 100) {
			return (
				<li key={index} className="w-full flex justify-between border-solid border-2 border-indigo-600 rounded-md bg-red-600 py-2 px-4 text-slate-100">
					<span>{item.color}</span>
					<span>{item.value}</span>
				</li>
			);
		} else {
			return (
				<li key={index} className="w-full flex justify-between border-solid border-2 border-indigo-600 rounded-md bg-green-700 py-2 px-4 text-slate-100">
					<span>{item.color}</span>
					<span>{item.value}</span>
				</li>
			);
		}
	});

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="w-full flex justify-evenly items-center">
				<form
					onSubmit={handleSubmit}
					className="w-10/12 flex flex-col space-y-4"
				>
					<label
						htmlFor="image-upload"
						className="block text-sm font-medium text-gray-700"
					>
						Select Image
					</label>
					<input
						type="file"
						id="image-upload"
						accept="image/*"
						onChange={handleImageChange}
						className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
					<button
						type="submit"
						className="px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Karo Bhaiya Shuru
					</button>
				</form>
				{selectedImage && (
					<div className="mt-8">
						<img
							src={selectedImage}
							className="h-28 w-28"
							alt="Selected Image Preview"
						/>
					</div>
				)}
			</div>

			<div className="mt-8">
				<h2 className="text-2xl font-bold ml-8 my-4">Result: </h2>
				<ul className="space-y-2 ml-8 w-3/5">
					{/* {processedData.map((item, index) => (
						<li key={index} className="text-gray-700">
							{item}
						</li>
					))} */}

					{render}
				</ul>
			</div>
		</div>
	);
}

export default App;
