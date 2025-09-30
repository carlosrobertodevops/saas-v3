// // Clerk
// import { useAuth } from "@clerk/nextjs";

// // Tradução
// import { useTranslations } from 'next-intl';

// export async function loginUser(credentials: {
//   email: string;
//   password: string;
// }) {

// const l = useTranslations('Common');
// // Clerk Auth
// const { userId, isLoaded } = useAuth();

//   if (isLoaded) {
//     // Optionally render a loading state
//   }
//   // In a real app, the credentials would be checked against a
//   // database and potentially a session token set in a cookie
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(
//           // User is loaded, proceed with login logic
//           // ...
//       );
//     }, 1000);
//   });
// }
