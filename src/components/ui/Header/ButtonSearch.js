import React from 'react'

const ButtonSearch = () => {
    return (
        <div className='flex flex-1 items-center justify-end space-x-4'>
            <nav className='flex items-center space-x-2'>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 xl:mr-2" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg><span className="hidden xl:inline-flex">Search name book</span><span className="sr-only">Search name book</span></button>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9 relative" aria-label="Open cart" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:Rbdcpla:" data-state="closed"><div className="inline-flex items-center border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 absolute -right-2 -top-2 h-6 w-6 justify-center rounded-full p-2.5">1</div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg></button>
                <button className=" inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 px-4 py-2 relative h-8 w-8 rounded-full" type="button" id="radix-:Rfdcpla:" aria-haspopup="menu" aria-expanded="false" data-state="closed"><span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8"><img className="aspect-square h-full w-full" alt="" src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yVklqVkxkdGFXa0NGb25BWjVVejlKVjNRVFEucG5nIn0" />
                </span>
                </button>
            </nav>
        </div>
    )
}

export default ButtonSearch