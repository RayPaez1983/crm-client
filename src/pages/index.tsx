import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useQuery, gql } from "@apollo/client";
const inter = Inter({ subsets: ['latin'] })

const menuQuery = gql`
query GetMenu {
  getMenu {
    dishName
    inStock
    protein
    vegetables
    price
    carbohydrates
  }
}
`;

export default function Home() {
  const { data, loading, error } = useQuery(menuQuery);
  console.log(data, loading, error, 'my info');
  
  return (
    <>
    {data?.getMenu.map((dish: any, idx: number)=>{
      return(<div key={idx}><h1>{dish.dishName}</h1>
      <div>
        <h4>{dish.protein}</h4>
        <h4>{dish.carbohydrates}</h4>
        <h4>{dish.vegetables}</h4>
        <h3>{dish.price}</h3>
        <h3>{dish.inStock}</h3>
      </div>
      </div>)
    })}
    </>
  )
}
