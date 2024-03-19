import { IBlock } from '@/models/Block'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Web3 from 'web3';

export default function BlockDetail({ block }: { block: IBlock}) {
  const router = useRouter(); // Initialize the router

  return (
    <div>
      <h1 className="text-3xl font-semibold leading-7 text-gray-900 dark:text-gray-300 mb-6">
        {/*  We need to go back in history -1 */}
        <a onClick={() => router.back()} className="text-blue-500 dark:text-blue-400 cursor-pointer">
          <ArrowLeftIcon className="h-5 w-5 inline-block mr-2" />
        </a>
        Block #{block.number.toString()}
      </h1>
      <div className="overflow-hidden bg-white dark:bg-gray-800 shadow sm:rounded-lg p-3">
        <div className="px-4 py-6 sm:px-6">
          <p className="font-bold text-gray-500 dark:text-gray-300">
            Parent: <Link href={`/block/${block.parentHash}`} className="text-blue-500 dark:text-blue-400">{block.parentHash}</Link> 
          </p>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-900">
          <dl className="divide-y divide-gray-200 dark:divide-gray-900">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900 dark:text-gray-300">Block height</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-2 sm:mt-0">
                {block.number.toString()}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900 dark:text-gray-300">
                Size
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-2 sm:mt-0">
                {block.size.toString()} bytes
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900 dark:text-gray-300">
                Timestamp
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-2 sm:mt-0">
                {new Date(Number(block.timestamp) * 1000).toLocaleString()}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900 dark:text-gray-300">
                Validated by
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-2 sm:mt-0">
                {block.miner}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900 dark:text-gray-300">
                Gas used
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-2 sm:mt-0">
                {Number(block.gasUsed).toLocaleString()} Wei
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900 dark:text-gray-300">
                Gas limit
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-2 sm:mt-0">
                {Number(block.gasLimit).toLocaleString()} Wei
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900 dark:text-gray-300">
                Difficulty
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-2 sm:mt-0">
                {block.difficulty.toString()}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900 dark:text-gray-300">
                Transactions
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-2 sm:mt-0">
                {block.transactions ? block.transactions.length.toString() : 0} in this block
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
