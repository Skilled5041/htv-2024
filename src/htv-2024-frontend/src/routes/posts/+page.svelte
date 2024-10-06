<script>
    import banner from "$lib/images/banner.png";
    import { backend } from "$lib/canisters";
    import { browser } from "$app/environment";
    import { onMount } from "svelte";

    // Get page_id query param from the URL
    let postId = -1;
    if (browser) {
        postId = new URLSearchParams(window.location.search).get("post_id");
        console.log(postId);
    }

    let amount = 0;

    let postInfo = null;
    const url = "https://api.commerce.coinbase.com/charges";
    const requestBody = {
        local_price: {
            amount: `${amount}`, //price of charge
            currency: "USD", //currency
        },
        pricing_type: "fixed_price",

        name: "Name of the charge",
        description: "Small description",
        redirect_url: "https://google.com", //optional redirect URL - change to ours

        metadata: {
            //optional charge metadata
            id: "Customer id",
            email: "bobby@axecapital.com",
            address: "123 Satoshi Lane",
        },
    };
    const payload = {
        method: "POST",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-CC-Api-Key": "cd4a5865-beef-45d1-9bb6-0e957d23c173", //API key from Commerce
        },
        body: JSON.stringify(requestBody),
    };


    async function createCharge() {
        try {
            const response = await fetch(url, payload);
            return await response.json();
        } catch (error) {
            console.error("Error creating charge:", error);
        }
    }

    let hostedUrl = "";

    async function PayMoney() {
        const requestBody = {
            transfer: "wallet to wallet",
            to: "", //creator info
            amount: "1.00", //creator info
            currency: "LTC" //creator info
        };

        const payload = {
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-CC-Api-Key": "e7a030d0-a657-4155-acab-a46890c6679b", //API key from Commerce
            },
            body: JSON.stringify(requestBody),
        };

        try {
            const response = await fetch(
                "https://api.coinbase.com/v2/accounts/0x13e070f51526b70b7232e47D4ab7402D769dd0fE/transactions",
                payload,
            );
            return await response.json();
        } catch (error) {
            console.error("Error sending money to creator", error);
        }
    }

    async function FlagComplete() {
        let complete = false;
        let latest = null;
        while (!complete) {
            latest = CheckCompleteTransaction();
            await new Promise((r) => setTimeout(r, 2000));

            if (latest.data.status == "completed") {
                complete = true;
            }
        }
        return latest;
    }

    async function CheckCompleteTransaction() {
        const payload = {
            method: "GET",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-CC-Api-Key": "e7a030d0-a657-4155-acab-a46890c6679b", //API key from Commerce
            },
        };

        try {
            let transactionid = GetRecent();
            const response = await fetch(
                `https://api.coinbase.com/v2/accounts/2bbf394c-193b-5b2a-9155-3b4732659ede/transactions/${await transactionid}`,
                payload,
            );
            return await response.json();
        } catch (error) {
            console.error("Error getting info for last transaction", error);
        }
    }

    const GetRecent = async () => {
        const transactionlist = await GetList();

        return transactionlist.data[transactionlist.data.length - 1].id;
    };

    async function GetList() {
        //check if a given transaction gets completed
        const payload = {
            method: "GET",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Authorization": "Bearer cd4a5865-beef-45d1-9bb6-0e957d23c173",
                "Content-Type": "application/json",
                "X-CC-Api-Key": "e7a030d0-a657-4155-acab-a46890c6679b", //API key from Commerce
            },
        };
        try {
            const response = await fetch(
                "https://api.coinbase.com/v2/accounts/0x13e070f51526b70b7232e47D4ab7402D769dd0fE/transactions",
                payload,
            );
            return await response.json();
        } catch (error) {
            console.error("Error getting list of transactions", error);
        }
    }

    onMount(async () => {
        postInfo = await backend.getPostSnapshot(BigInt(postId));
        liked = localStorage.getItem("liked" + postId) === "true";
        const chargeData = await createCharge();
        if (chargeData?.data?.hosted_url) {
            hostedUrl = chargeData.data.hosted_url;
        }
        investmentValue = evaluatePolynomial(Number.parseInt(postInfo.likes));
    });

    let liked = false;
    const handleLike = () => {
        liked = !liked;
        localStorage.setItem("liked", liked);
        if (liked) {
            postInfo.likes += 1n;
            postInfo = postInfo;
            backend.likePost(0);
        } else {
            postInfo.likes -= 1n;
            postInfo = postInfo;
            backend.unlikePost(0);
        }
    };

    function handleClick() {
        if (hostedUrl) {
            window.open(hostedUrl);
        }
    }

    const donate = async () => {
        handleClick();
        let target = FlagComplete();
        //     .then(res => {
        //     PayMoney();
        // });
    };

    function uint8ArrayToImageUrl(uint8Array) {
        const blob = new Blob([uint8Array], {type: "image/jpeg"}); // Adjust the MIME type as needed
        const imageUrl = URL.createObjectURL(blob);
        return imageUrl;
    }

    function evaluatePolynomial(x) {
        return Math.pow(x, 4) + 2 * Math.pow(x, 3) - 5 * Math.pow(x, 2) - x + 4;
    }

    let investmentValue = 0;
</script>

<div>
    <img src={banner} alt="Banner" class="w-full h-auto object-cover max-h-48 object-center"/>
    {#if postInfo != null}
        <div class="flex w-full min-h-[80vh]">
            <div class="w-[75%] flex flex-col items-center p-4">
                <h1 class="text-center pt-16 text-6xl max-w-[65%] font-semibold leading-normal">{postInfo.title}</h1>
                <img src={uint8ArrayToImageUrl(postInfo.images[0])} alt="Post Image"
                     class="w-1/2 max-w-screen-lg h-auto object-cover object-center pt-36"/>
                <p class="w-[50%] text-2xl pt-16 leading-10">{postInfo.description}</p>
            </div>
            <div class="border-l-2 border-neutral-200 p-4 flex flex-col items-center w-[25%]">
                <h1 class="text-3xl pt-12">By: {postInfo.creator}</h1>
                <input type="text" class="border-2 border-neutral-200 rounded-xl p-2 w-64 text-2xl mt-16"
                       placeholder="Amount (USD)" bind:value={amount}/>
                <button class="text-3xl mt-4 w-64 bg-[#3B00B9] text-white p-4 rounded-2xl hover:bg-[#2f0785] hover:scale-110 duration-200"
                        on:click={donate}>
                    Support
                </button>
                <div class="flex">
                    <h1 class="mt-16 text-3xl font-bold">
                        Investment value:
                    </h1>
                    <h1 class="ml-3 mt-16 text-3xl font-bold bg bg-gradient-to-r text-center from-[#912380] via-[#F05A24] to-[#29AAE1] text-transparent bg-clip-text">
                        + {investmentValue / 100}%
                    </h1>
                </div>
                <button class="pt-12" on:click={handleLike}>
                    <div class="flex gap-2 items-center py-4 px-6 border-4 rounded-full shadow-red-200 shadow-2xl hover:bg-neutral-50 hover:scale-105 duration-150 active:scale-90">
                        {#if liked}
                            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24"
                                 {...$$props}>
                                <path fill="red"
                                      d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"/>
                            </svg>
                        {:else}
                            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24"
                                 {...$$props}>
                                <path fill="red"
                                      d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3"/>
                            </svg>
                        {/if}
                        <h1 class="text-3xl">{postInfo.likes}</h1>
                    </div>
                </button>
            </div>
        </div>
    {:else}
        <p>Loading...</p>
    {/if}
</div>