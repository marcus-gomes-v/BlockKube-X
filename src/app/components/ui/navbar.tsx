'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { Disclosure } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  const [input, setInput] = useState('');
  const router = useRouter();

  const handleSearch = async () => {
    if (/^0x[a-fA-F0-9]{64}$/.test(input)) { // Transaction Hash
      router.push(`/tx/${input}`); // Navigate to transaction detail page
    } else if (/^0x[a-fA-F0-9]{40}$/.test(input)) { // Wallet Address
      router.push(`/address/${input}`); // Navigate to wallet detail page
    } else {
      alert("Invalid input");
    }
  };

  const links = [
    { name: 'Home', href: '/' },
  ]

  return (
    <Disclosure as="nav" className="bg-gray-200 dark:bg-gray-900">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0 text-gray-700 dark:text-white">
                  <a href="/">
                    BlockKube
                  </a>
                </div>
                <div className="hidden lg:ml-6 lg:block">
                  <div className="flex space-x-4">
                    {links.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-sky-600 dark:text-gray-300 hover:dark:bg-gray-700 hover:dark:text-white "
                      >
                        {item.name}
                      </a>
                    ))
                    }
                  </div>
                </div>
              </div>
              <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border-0 bg-gray-100 text-gray-400 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 dark:bg-gray-700 dark:text-gray-300 placeholder:dark:text-gray-400 focus:dark:bg-white focus:dark:text-gray-900 py-1.5 pl-10 pr-3 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Search"
                      type="search"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Trigger search on Enter key press
                    />
                  </div>
                </div>
              </div>
              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
             
              {links.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                  >
                    {item.name}
                  </Disclosure.Button>  
                ))
              }
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}