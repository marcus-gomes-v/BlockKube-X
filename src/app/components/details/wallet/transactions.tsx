import { ITransaction } from '@/models/Transaction';
import { cn } from '@/utils/cn';
import { ArrowDownIcon, ArrowUpIcon, EllipsisVerticalIcon, LinkIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import Web3 from 'web3';

export default function Transactions({ wallet, transactions }: { wallet: string, transactions: ITransaction[]}) {
  const router = useRouter(); // Initialize the router
  console.log(wallet, transactions)
  return (
    <div>
      <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {transactions.map((tx: ITransaction, index) => (
          <li key={index} className="col-span-1 flex rounded-md shadow-sm">
            <div
              className={cn(
                tx.from.toLowerCase() === wallet.toLowerCase() ? 'bg-red-600' : 'bg-green-600',
                'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white'
              )}
            >
              
              {
                tx.from.toLowerCase() === wallet.toLowerCase() ? 
                (<ArrowUpIcon className="h-5 w-5" aria-hidden="true" />) :
                (<ArrowDownIcon className="h-5 w-5" aria-hidden="true" />)
              }
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                {
                  tx.from.toLowerCase() === wallet.toLowerCase() ? 
                  `From: ${tx.from}` : 
                  `To: ${tx.to}`
                }
                <p className="text-gray-500">{Web3.utils.fromWei(tx.value, 'ether')} ETH</p>
              </div>
              <div className="flex-shrink-0 pr-2">
                <button
                  onClick={() => router.push(`/tx/${tx.hash}`)}
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">See transaction</span>
                  <LinkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
