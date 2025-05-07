import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useLocale } from '../hooks/useLocale'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export function LocaleSelector() {
  const { currentLocale, locales, changeLocale } = useLocale()

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <span className="flex items-center">
            {currentLocale.flag && (
              <span className="mr-2">{currentLocale.flag}</span>
            )}
            {currentLocale.nativeName}
          </span>
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {locales.map((locale) => (
              <Menu.Item key={locale.code}>
                {({ active }) => (
                  <button
                    onClick={() => changeLocale(locale)}
                    className={`${
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    } ${
                      currentLocale.code === locale.code ? 'bg-gray-50' : ''
                    } flex w-full items-center px-4 py-2 text-sm`}
                  >
                    {locale.flag && (
                      <span className="mr-2">{locale.flag}</span>
                    )}
                    {locale.nativeName}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
} 