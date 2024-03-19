import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation';
import Transactions from './transactions';

export default function WalletDetail({ wallet }: { wallet: any}) {
  const router = useRouter(); // Initialize the router

  return (
    <div>
      <h1 className="text-3xl font-semibold leading-7 text-gray-900 dark:text-gray-300 mb-6">
        <a onClick={() => router.back()} className="text-blue-500 dark:text-blue-400 cursor-pointer">
          <ArrowLeftIcon className="h-5 w-5 inline-block mr-2" />
        </a>
        Wallet Details
      </h1>
      <div className="overflow-hidden bg-white dark:bg-gray-800 shadow sm:rounded-lg p-3 mb-9">
        <div className="px-4 py-6 sm:px-6">
          <p className="font-bold text-gray-500 dark:text-gray-300">
            Wallet: {wallet.address}
          </p>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-900">
          <dl className="divide-y divide-gray-200 dark:divide-gray-900">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900 dark:text-gray-300">Balance</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-2 sm:mt-0">
                {wallet.balance} ETH
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <Transactions wallet={wallet.address} transactions={wallet.transactions} />
    </div>
  )
}
