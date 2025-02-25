import Image from 'next/image'
import gam4 from './assets/gambarkeempat.jpg'
import gam5 from './assets/gambarkelima.jpg'
const Body = () => {
  return (
    <div>

         {/* Section pertama - Gambar kanan, teks kiri */}
      <div className="max-w-7xl mx-auto my-16 p-10 flex flex-col md:flex-row items-center gap-8 min-h-[300px]">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold">Heading</h2>
          <h3 className="text-gray-500 text-xl">Subheading</h3>
          <p className="mt-4 text-lg text-gray-700">
            Body text for your whole article or post. Youll put in some lorem ipsum to show how a filled-out page might look.
          </p>
          <p className="mt-4 text-lg text-gray-700">
            Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate content. 
            Qui international first-class nulla ut. Punctual adipiscing, essential lovely queen tempor eiusmod irure.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <Image 
            src={gam4} 
            alt="Placeholder" 
            width={600} 
            height={300} 
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Section kedua - Gambar kiri, teks kanan */}
      <div className="max-w-7xl mx-auto my-16 p-10 flex flex-col md:flex-row items-center gap-8 min-h-[300px]">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <Image 
            src={gam5} 
            alt="Placeholder" 
            width={600} 
            height={300} 
            className="rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold">Heading</h2>
          <h3 className="text-gray-500 text-xl">Subheading</h3>
          <p className="mt-4 text-lg text-gray-700">
            Body text for your whole article or post. Well put in some lorem ipsum to show how a filled-out page might look.
          </p>
          <p className="mt-4 text-lg text-gray-700">
            Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate content. 
            Qui international first-class nulla ut. Punctual adipiscing, essential lovely queen tempor eiusmod irure.
          </p>
        </div>
      </div>
    </div>
  
  )
}

export default Body