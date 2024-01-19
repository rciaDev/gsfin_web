const getUser = async () => {
  const data = await fetch('https://jsonplaceholder.typicode.com/comments?postId=2');

  return await data.json();
}

export default async function PlanoDeContas() {
  const users = await getUser();

  return (
    <main className="text-center">
      Plano de contas

      { users.map((user:any, item:number) => {
        return <h1 className="py-10" key={item}>Comentario{ user.body }<br/></h1>
      }) }
    </main>
  )
}
