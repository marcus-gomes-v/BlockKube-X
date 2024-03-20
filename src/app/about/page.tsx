import { CloudArrowUpIcon, ServerIcon } from '@heroicons/react/20/solid'
import { IconBrandTailwind } from '@tabler/icons-react'

export default function Example() {
  return (
    <div className="relative">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">About The Project</h1>
              <p className="mt-6 text-xl leading-8 text-gray-700 dark:text-gray-100">
                <strong>Block Kube X</strong> is the culmination of a vision to democratize access to blockchain data, offering an easy-to-use, customizable, and open-source blockchain explorer for Ethereum. 
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 dark:bg-gray-100 shadow-xl dark:shadow-2xl ring-1 ring-gray-400/10 dark:ring-gray-100/10 sm:w-[57rem]"
            src="/application.png"
            alt=""
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 dark:text-gray-100 lg:max-w-lg">
              <p>
                Born from the need for a simple, yet powerful explorer that anyone can deploy, customize, and extend, <strong>Block Kube X</strong> leverages the robustness of Next.js, React, and TailwindCSS for a seamless user experience, paired with MongoDB for efficient data management.
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600 dark:text-gray-300">
                <li className="flex gap-x-3">
                  <CloudArrowUpIcon className="mt-1 h-5 w-5 flex-none text-sky-600 dark:text-sky-300" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-gray-900 dark:text-gray-200">Easy to deploy.</strong> Leverage Next.js and Docker for a straightforward deployment process. Simplify your workflow with push-to-deploy features.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <IconBrandTailwind className="mt-1 h-5 w-5 flex-none text-sky-600 dark:text-sky-300" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-gray-900 dark:text-gray-200">Powerfull Style.</strong> Customize with Tailwind CSS for rapid UI development. Design your explorer with minimal effort.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <ServerIcon className="mt-1 h-5 w-5 flex-none text-sky-600 dark:text-sky-300" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-gray-900 dark:text-gray-200">MongoDB.</strong> Utilize MongoDB for efficient data storage and retrieval. Ensure scalable and reliable database operations.
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                 As part of the larger <strong>Block Kube</strong> project—an initiative aimed at simplifying blockchain network management on Kubernetes—<strong>Block Kube X</strong> stands as a testament to our commitment to making blockchain technology more accessible and manageable. 
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300">The Block Kube.</h2>
              <p className="mt-6">
                <strong>Block Kube</strong> itself is a pioneering tool that facilitates the setup, configuration, and management of blockchain networks, supporting both private and public environments with a user-friendly CLI.
              </p>
              <p className="mt-6">
                This project is for anyone looking to delve into the Ethereum blockchain, whether for educational purposes, development, or enterprise use.
              </p>

              <p className="mt-6">
                Explore <strong>Block Kube X</strong> on GitHub: <a href="https://github.com/marcus-gomes-v/BlockKube-X" className="text-blue-500 hover:text-blue-600">Block Kube X Repository</a> or see it in action here: <a href="https://blockkube-x.vercel.app/" className="text-blue-500 hover:text-blue-600">Live Demo</a>.
              </p>

              <p className="mt-6">
                Join us in our journey to build a simple, easy-to-use, and configurable explorer.
              </p>
              
              <p className="mt-6">
                Your contributions can help make <strong>Block Kube X</strong> even better for everyone in the blockchain community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
