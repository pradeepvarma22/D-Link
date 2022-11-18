import { useState } from "react"
import { NFTStorage, File } from "nft.storage";
import { ethers } from "ethers";
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

    console.log('xxx', fileUrl)
    console.log('xxx', files)

    const handleUpload = async (e) => {


        const imgFile = e.target.files[0];
        setFiles([...files,imgFile ]);
        const token = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY
        const client = new NFTStorage({ token })

        const metadata = await client.store({
            name: nftName,
            description:nftDescription,
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
        console.log(userAddress,fileUrl ,  interval)
        let txn = await dnftContract.safeMint(userAddress,fileUrl ,  interval);
        txn = await txn.wait();
        console.log(txn)
    }


    return (
        <div>
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

        </div>
    )


    function handleAttributes(e) {
        e.preventDefault();

        setAttributes([...attributes, { "trait_type": e.target[0].value, "value": Number(e.target[1].value), "max_value": Number(e.target[2].value) }])

        e.target.reset();


    }

}
