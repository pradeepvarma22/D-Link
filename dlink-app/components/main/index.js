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


    const handleUpload = async (e) => {


        const imgFile = e.target.files[0];
        setFiles([...files, imgFile]);
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
                                            for="nftname"
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
                                            for="nftdescription"
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
                                            for="interval"
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
                                            <label className="block uppercase tracking-wide text-xs font-bold mb-2" for="trait-type">
                                                Trait Type
                                            </label>
                                            <input name="trait_type" className="appearance-none block w-full   text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="trait-type" type="text" placeholder="Ex: cuteness" />
                                        </div>
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">

                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="trait-value">
                                                Value
                                            </label>
                                            <input name="value" className="appearance-none block w-full   text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="trait-value" type="number" placeholder="Ex: 5" />
                                        </div>
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="max_value">
                                                Max value
                                            </label>
                                            <input name="max_value" className="appearance-none block w-full   text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="max_value" type="text" placeholder="Ex: 10" />
                                        </div>
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="trait-submit">
                                                &nbsp;
                                            </label>
                                            <input className="appearance-none block w-full   text-gray-700 border bg-blue-100 border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500" id="trait-submit" type="submit" value="Add" />
                                        </div>
                                    </form>





                                    <div className="mb-6 pt-4">
                                        <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                                            Upload File
                                        </label>

                                        <div className="mb-8">
                                            <input type="file" name="file" onChange={handleUpload} id="file" className="sr-only" />
                                            <label
                                                for="file"
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
                        2
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