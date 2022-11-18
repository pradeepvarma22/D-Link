import { ethers } from "ethers";
import { File, NFTStorage } from "nft.storage";
import { useState } from "react"

import { DLINK_ABI, DLINK_ADDRESS } from "../../constants/contract/DLink";

// import { Web3Storage, getFilesFromPath } from 'web3.storage'


// upload all image ipfs json to contract
// 


export default function MainPage({ walletState, walletDispatch }) {

    const [nftName, setNftName] = useState("")
    const [nftDescription, setNftDescription] = useState("")
    const [attributes, setAttributes] = useState([]);
    const [interval, setInterval] = useState(0);
    const [fileUrl, setFileUrl] = useState([]);
    const [files, setFiles] = useState([]);
    const [openseaURL, setOpenseaURL] = useState(null);
    const [txn, setTxn] = useState();
    const [uploadLoader, setUploadLoader] = useState(false);

    console.log(fileUrl)

    const handleUpload = async (e) => {

        setUploadLoader(true);
        const imgFile = e.target.files[0];
        setFiles([...files, URL.createObjectURL(imgFile)]);
        const token = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY
        const client = new NFTStorage({ token })

        const metadata = await client.store({
            name: nftName,
            description: nftDescription,
            image: imgFile,
            attributes: attributes
        });
        setFileUrl([...fileUrl, metadata.url]);
        e.target.value = null;

        setUploadLoader(false);


        /*


        // todo: change file name
        const token = process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN_KEY

        e.preventDefault();
        let data = e.target.files[0];
   
        const storage = new Web3Storage({ token });
        const files = []
        files.push(data);

        const cid = await storage.put(files)
        const url = `https://ipfs.io/ipfs/${cid}/${data.name}`

        setFileUrl([...fileUrl, url]);

        e.target.value = null;
        */
    }

    const handleMint = async () => {
        const provider = walletState.provider
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();

        const dnftContract = new ethers.Contract(DLINK_ADDRESS, DLINK_ABI, signer);

        let txn = await dnftContract.safeMint(userAddress, fileUrl, interval);
        txn = await txn.wait();
        const tokenCounter = await dnftContract.tokenCounter();
        const deployedAt = `https://testnets.opensea.io/assets/mumbai/0x4ea8e4a9111ac32a3a198be66c034d4f6f5f9f7c/${tokenCounter}`
        const txnHash = `https://mumbai.polygonscan.com/tx/${txn.transactionHash}`
        setOpenseaURL(deployedAt)
        setTxn(txnHash);
        alert('Minted')

    }


    return (
        <div>

            <div>


                <div className="md:grid grid-cols-2 sm:grid-row-1">

                    <div className="">
                        <div className="flex items-center justify-center py-10 ">

                            <div className="mx-auto w-full max-w-[520px] bg-slate-50 border-2 rounded-md p-10">
                                <div className="py-1 px-1">
                                    <div className="mb-4">
                                        <label
                                            htmlFor="nftname"
                                            className="mb-3 block text-base font-medium text-[#07074D]"
                                        >
                                            NFT Name:
                                        </label>
                                        <input
                                            type="text"
                                            name="nftname"
                                            id="nftname"
                                            onChange={(e) => setNftName(e.target.value)}
                                            placeholder="NFT Name"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <label
                                            htmlFor="nftdescription"
                                            className="mb-3 block text-base font-medium text-[#07074D]"
                                        >
                                            Description:
                                        </label>
                                        <input
                                            type="text"
                                            name="nftdescription"
                                            id="nftdescription"
                                            onChange={(e) => setNftDescription(e.target.value)}
                                            placeholder="Description for your NFT"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                    </div>

                                    <div className="mb-5">
                                        <label
                                            htmlFor="interval"
                                            className="mb-3 block text-base font-medium text-[#07074D]"
                                        >
                                            Interval:
                                        </label>
                                        <input
                                            type="number"
                                            name="interval"
                                            id="interval"
                                            placeholder="Interval in seconds Ex: 60"
                                            onChange={(e) => setInterval(e.target.value)}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                    </div>







                                    <form onSubmit={handleAttributes} className="flex flex-wrap-mx-3 mb-2">
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="trait-type">
                                                Trait Type
                                            </label>
                                            <input name="trait_type" className="appearance-none block w-full   text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="trait-type" type="text" placeholder="Ex: cuteness" />
                                        </div>
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">

                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="trait-value">
                                                Value
                                            </label>
                                            <input name="value" className="appearance-none block w-full   text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="trait-value" type="number" placeholder="Ex: 5" />
                                        </div>
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="max_value">
                                                Max value
                                            </label>
                                            <input name="max_value" className="appearance-none block w-full   text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="max_value" type="text" placeholder="Ex: 10" />
                                        </div>
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="trait-submit">
                                                &nbsp;
                                            </label>
                                            <input className="appearance-none block w-full   text-gray-700 border bg-blue-100 border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500" id="trait-submit" type="submit" value="Add" />
                                        </div>
                                    </form>



                                    {uploadLoader ? (
                                        <div className="mb-6 px-[29%] pt-4">
                                            <button disabled type="button" class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                                                <svg role="status" class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                                </svg>
                                                Uploading to IPFS...
                                            </button>

                                        </div>
                                    ) : (
                                        <div className="mb-6 pt-4">
                                            <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                                                Upload File
                                            </label>

                                            <div className="mb-8">
                                                <input type="file" name="file" onChange={handleUpload} id="file" className="sr-only" />
                                                <label
                                                    htmlFor="file"
                                                    className="relative flex min-h-[150px] items-center justify-center rounded-md border border-dashed border-[#e77b7b] p-8 text-center"
                                                >
                                                    <div>

                                                        <span
                                                            className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]"
                                                        >
                                                            Browse
                                                        </span>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    )}





                                    <div>
                                        <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none" onClick={handleMint}>
                                            Mint
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-rows-2">

                            <div>
                                <div>
                                    <div className="grid grid-cols-1 py-10 pr-24 w-9/12 h-5/6">
                                        <div className="container mx-auto">
                                            <div className="grid-cols-3 p-20 space-y-2 bg-yellow-200 lg:space-y-0 lg:grid lg:gap-3 lg:grid-rows-3">
                                                {files && files.map((item, index) => (
                                                    <div className="w-full rounded" key={index}>
                                                        <img src={item}
                                                            alt="image" />
                                                    </div>
                                                ))}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="grid grid-cols-2">
                                    <div>
                                        <div>{nftName}</div>
                                        <div>{nftDescription}</div>
                                        {interval ? (
                                            <div>{interval} Seconds</div>
                                        ) : (
                                            <div></div>
                                        )}
                                    </div>
                                    <div>
                                        <div>
                                            {attributes && attributes.map((item, index) => (
                                                <div className="w-full rounded" key={index}>
                                                   <div>{item.trait_type} : {item.value}/{item.max_value}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>

                <div>

                    {"DATA RESULT"}
                    <div>
                        <div>


                            <div>TXN RESULT</div>
                            <div>
                                {txn && (
                                    <div>
                                        <a href={txn} target="_blank" rel="noopener noreferrer">{txn}</a>
                                    </div>
                                )}
                            </div>
                            <div>
                                {openseaURL && (
                                    <div>
                                        <a href={openseaURL} target="_blank" rel="noopener noreferrer">{openseaURL}</a>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>

            </div>



        </div>
    )


    function handleAttributes(e) {
        e.preventDefault();

        setAttributes([...attributes, { "trait_type": e.target[0].value, "value": Number(e.target[1].value), "max_value": Number(e.target[2].value) }])

        e.target.reset();


    }

}


/*
             <input type="text" onChange={(e) => setNftName(e.target.value)} placeholder="NFT NAME" />
            <input type="text" onChange={(e) => setNftDescription(e.target.value)} placeholder="NFT Description" />
            <input type="number" onChange={(e) => setInterval(e.target.value)} placeholder="Interval" />


            <div>
                <div>
                    <form onSubmit={handleAttributes}>
                        <input name="trait_type" placeholder="trait_type" />
                        <input name="value" type="number" placeholder="value" />
                        <input name="max_value" type="number" placeholder="max_value" />
                        <input type="submit" value="Add" />
                    </form>
                </div>
            </div>

            <div>
                <input type="file" onChange={handleUpload} />
            </div>

            <div>
                <button onClick={handleMint}>Mint</button>
            </div>



*/