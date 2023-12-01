import { FindStock } from "~/modules/Home";

// function generateRandomStrings() {
//   const items = new Set<string>();
//   while (items.size < 20000) {
//     const randomString = Math.random().toString(36).substr(2, 10);
//     items.add(randomString);
//   }
//   return Array.from(items);
// }

// const initialOptions: string[] = generateRandomStrings();

export default async function Home() {
  return (
    <main className="p-10">
      <FindStock />
    </main>
  );
}

