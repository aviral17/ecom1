"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
    id?: number;
    title?: string;
    description?: string;
    price?: number;
    discountPercentage?: number;
    rating?: number;
    stock?: number;
    brand?: string;
    category?: string;
    thumbnail?: string;
    images?: string[];
}


export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);

    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const router = useRouter();

    useEffect(() => {
        // Fetch products from API endpoint
        fetch('/api/products')
            .then(response => response.json())
            .then((data) => {
                console.log("Data inside useeffect of products ------>");

                console.log("Data=", data);
                setProducts(data?.products);
                const uniqueCategories: string[] = Array.from(new Set(data?.products?.map((product: Product) => product?.category)));
                setCategories(uniqueCategories);
            });
    }, []);


    const filteredProducts = products.filter(product => selectedCategories.includes(product.category!));

    return (
        <div className="flex">
            <div className="w-1/5 border-r pl-[10px] pt-[10px]">
                <h2 className='mb-2 cursor-pointer'>Categories</h2>
                {categories.map(category => (
                    <div key={category}>
                        <input type="checkbox" id={category} name={category} value={category} onChange={() => handleCategoryChange(category)} />
                        <label htmlFor={category}>{category}</label>
                    </div>
                ))}
            </div>
            <div className="w-4/5">
                {selectedCategories.length > 0 ? filteredProducts.map(product => (
                    <div key={product.id} className="p-4 border-b cursor-pointer" onClick={() => router.push(`/products/${product.id}`)}>
                        <h2 className="text-xl">{product.category}</h2>
                        <p className="text-lg">{product.price}</p>
                        <p className="text-lg">{product.title}</p>
                        <p className="text-lg">{product.description}</p>
                    </div>
                )) : products.map(product => (
                    <div key={product.id} className="p-4 border-b cursor-pointer" onClick={() => router.push(`/products/${product.id}`)}>
                        <h2 className="text-xl">{product.category}</h2>
                        <p className="text-lg">{product.price}</p>
                        <p className="text-lg">{product.title}</p>
                        <p className="text-lg">{product.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    function handleCategoryChange(category: string) {
        setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
    }
}
