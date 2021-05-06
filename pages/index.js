import { signIn, signOut, useSession } from 'next-auth/client'

// function name(data) {
  
//   allEpisodes.map((episode, index) => {
//   const results = data.map((data) => {
//     return { data }
    
// }

export default function Home() {
  const [session, jwt] = useSession()

  return (
    <>
    {!session &&<>
      Not signed in <br/>
      <button onClick={() => signIn()}>Sign in</button>
      </>}
      
      {session && <>
        <p>accessToken: {session.accessToken}</p>
        <p>user: {session.user.name}</p>
        <p>business: {session.content[0].name}</p>

      <button onClick={() => signOut()}>Sign out</button>
      </>}

      
  </>
  )
}
