import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { encodeFunctionData, formatEther, parseGwei } from 'viem';
import { baseSepolia } from 'viem/chains';
import type { FrameTransactionResponse } from '@coinbase/onchainkit/frame';

const ClickTheButtonABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"}],"name":"EnumerableMapNonexistentKey","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[],"name":"WrongValue","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"clickTheButton","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAllClicks","outputs":[{"components":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"clicks","type":"uint256"}],"internalType":"struct ClickTheButton.Clicker[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMyClicks","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const CLICK_THE_BUTTON_CONTRACT_ADDR = "0x863632E7607150d550A92502c0375802047eaa48"

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
    const body: FrameRequest = await req.json();
    const { isValid } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });
  
    if (!isValid) {
      return new NextResponse('Message not valid', { status: 500 });
    }
  
    // TODO START

    // TODO STEP 1

    const data = encodeFunctionData({
        abi: ClickTheButtonABI,
        functionName: 'clickTheButton',
      });


    // TODO STEP 2

    const txData: FrameTransactionResponse = {
      chainId: `eip155:${baseSepolia.id}`,
      method: 'eth_sendTransaction',
      params: {
        abi: [],
        data,
        to: CLICK_THE_BUTTON_CONTRACT_ADDR,
        value: parseGwei('10000').toString(), // 0.00001 ETH
      },
    };

    // TODO STEP 3

    return NextResponse.json(txData);

    // TODO END

  }
  
  export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
  }
  
  export const dynamic = 'force-dynamic';





