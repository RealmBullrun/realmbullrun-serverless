export default function Custom404() {
  return (
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto  text-center">
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary">404</h1>
        <p className="mb-4 text-3xl tracking-tight font-bold  md:text-4xl">Something is missing.</p>
        <p className="mb-4 text-lg font-light ">Sorry, we cannot find that page. You will find lots to explore on the Club. </p>
        <a href="/explore" className="inline-flex text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Explore Club</a>
      </div>
    </div>
  )
}