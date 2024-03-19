import { ITransaction } from '@/models/Transaction';
import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Web3 from 'web3';

export default function TransactionDetail({ tx }: { tx: ITransaction}) {
  const router = useRouter(); // Initialize the router

  return (
    <div>
      <h1 className="text-3xl font-semibold leading-7 text-gray-900 dark:text-gray-300 mb-6">
        {/*  We need to go back in history -1 */}
        <a onClick={() => router.back()} className="text-blue-500 dark:text-blue-400 cursor-pointer">
          <ArrowLeftIcon className="h-5 w-5 inline-block mr-2" />
        </a>
        Transaction Details
      </h1>
      <div className="overflow-hidden bg-white dark:bg-gray-800 shadow sm:rounded-lg p-3">
        <div className="px-4 py-6 sm:px-6">
          <p className="font-bold text-gray-500 dark:text-gray-300">
            Hash: {tx.hash}
          </p>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-900">
          <dl className="divide-y divide-gray-200 dark:divide-gray-900">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900 dark:text-gray-300">Block</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-2 sm:mt-0">
                <Link href={`/block/${tx.blockNumber}`} className='text-blue-500 dark:text-blue-400 cursor-pointer'>
                  {tx.blockNumber.toString()}
                </Link>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900 dark:text-gray-300">
                From
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-2 sm:mt-0">
                <Link href={`/address/${tx.from}`} className='text-blue-500 dark:text-blue-400 cursor-pointer'>
                  {tx.from}
                </Link>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900 dark:text-gray-300">
                To
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-2 sm:mt-0">
                <Link href={`/address/${tx.to}`} className='text-blue-500 dark:text-blue-400 cursor-pointer'>
                  {tx.to}
                </Link>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900 dark:text-gray-300">
                Value
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-2 sm:mt-0">
                {Number(Web3.utils.fromWei(tx.value, 'ether')).toLocaleString()} KUBE
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900 dark:text-gray-300">
                Transaction fee
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-2 sm:mt-0">
                {Number(Web3.utils.fromWei(tx.gas, 'ether')).toFixed(10).toLocaleString()} KUBE
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900 dark:text-gray-300">
                Gas price
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-2 sm:mt-0">
                {Number(Web3.utils.fromWei(tx.gasPrice, 'ether')).toFixed(10).toLocaleString()} KUBE
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900 dark:text-gray-300">
                Gas usage
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-2 sm:mt-0">
                {Number(`${tx.gasUsed || 0}`).toFixed(10).toLocaleString()}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
