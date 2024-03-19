import { ArrowLeftIcon } from '@heroicons/react/20/solid'

export default function About() {

  return (
    <div>
      <h1 className="text-3xl font-semibold leading-7 text-gray-900 dark:text-gray-300 mb-6">
        About Block Kube X
      </h1>
      <div className="overflow-hidden bg-white dark:bg-gray-800 shadow sm:rounded-lg p-3 mb-9 text-lg">
        <div className="px-4 py-6 sm:px-6 space-y-6">
          <p className="mt-2 text-gray-500 dark:text-gray-300">
            BlockKube X is the culmination of a vision to democratize access to blockchain data, offering an easy-to-use, customizable, and open-source blockchain explorer for Ethereum. 
          </p>
          
          <p className="mt-2 text-gray-500 dark:text-gray-300"> 
            Born from the need for a simple, yet powerful explorer that anyone can deploy, customize, and extend, BlockKube X leverages the robustness of Next.js, React, and TailwindCSS for a seamless user experience, paired with MongoDB for efficient data management.
          </p>
          
          <p className="mt-2 text-gray-500 dark:text-gray-300">
            As part of the larger BlockKube project—an initiative aimed at simplifying blockchain network management on Kubernetes—BlockKube X stands as a testament to our commitment to making blockchain technology more accessible and manageable. 
          </p>
          
          <p className="mt-2 text-gray-500 dark:text-gray-300">
            BlockKube itself is a pioneering tool that facilitates the setup, configuration, and management of blockchain networks, supporting both private and public environments with a user-friendly CLI.
          </p>

          <p className="mt-2 text-gray-500 dark:text-gray-300">
            The creation of BlockKube X was motivated by the absence of a straightforward, adaptable blockchain explorer. 
          </p>
          
          <p className="mt-2 text-gray-500 dark:text-gray-300">
            It’s designed to solve common pain points by offering a lightweight solution that’s not only easy to set up and configure but also open for contributions. 
          </p>
          
          <p className="mt-2 text-gray-500 dark:text-gray-300">
            This project is for anyone looking to delve into the Ethereum blockchain, whether for educational purposes, development, or enterprise use.
          </p>

          <p className="mt-2 text-gray-500 dark:text-gray-300">
            Explore BlockKube X on GitHub: <a href="https://github.com/marcus-gomes-v/BlockKube-X" className="text-blue-500 hover:text-blue-600">BlockKube-X Repository</a> or see it in action here: <a href="https://blockkube-x.vercel.app/" className="text-blue-500 hover:text-blue-600">Live Demo</a>.
          </p>

          <p className="mt-2 text-gray-500 dark:text-gray-300">
            Join us in our journey to build a simple, easy-to-use, and configurable explorer.
          </p>
          
          <p className="mt-2 text-gray-500 dark:text-gray-300">
            Your contributions can help make BlockKube X even better for everyone in the blockchain community.
          </p>
        </div>
      </div>
    </div>
  )
}
