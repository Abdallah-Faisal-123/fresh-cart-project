/* 
import Homescreen from "../app/(page)/Screens/Home.screen";


export default function Home() {
  return (
    <div className="">
      <Homescreen/>
      </div>
  );
} */
import getCategories, { getProducts } from './(page)/server/category.Actions';
import Homescreen from './(page)/Screens/Home.screen';

export default async function Home() {
  const response = await getCategories();
  const productsRes = await getProducts();
  return (
    <div>
      <Homescreen res={response} productsRes={productsRes} />
    </div>
  );
}
