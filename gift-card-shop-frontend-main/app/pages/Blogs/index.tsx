import React, { useState } from 'react';
import { CalendarIcon } from './Icons/CalendarIcon';
import UserIcon from './Icons/UserIcon';
import { ClockIcon } from './Icons/ClockIcon';
import { RightArrowIcon } from './Icons/RightArrowIcon';
import Hero from './components/Hero';

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    date: string;
    author: string;
    readTime: string;
}

const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: '7 Benefits of Buying Gift Cards with Crypto',
        excerpt:
            'What advantages do you get when buying gift cards using cryptocurrency compared to traditional payment methods? Learn more about the benefits.',
        image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=500&fit=crop',
        date: 'November 22, 2025',
        author: 'Giftcard Team',
        readTime: '6 min read',
        content: `
# 7 Benefits of Buying Gift Cards with Crypto

In the digital age, buying gift cards using cryptocurrency has become a popular and convenient method. Let's explore why you should use crypto:

## 🚀 1. Instant Transactions

Crypto payments are typically completed within minutes.

**Benefits:**

* No waiting 2-3 days like bank transfers
* No credit card verification hassles
* Transact 24/7 anytime
* No restrictions on weekends or holidays

**Real Example:**

Even if you want to buy a Netflix gift card at midnight, you'll get it instantly. No need to wait for banking hours or business days.

## 🔒 2. Maximum Security & Privacy

Crypto transactions are highly secure and your personal information remains protected.

**Security Features:**

* Protected by blockchain technology
* No need to share credit card numbers or bank details
* No risk of chargeback fraud
* Lower chance of personal data leaks

**Privacy:**

You can complete transactions without providing your name, address, or card details.

## 🌍 3. International Transaction Convenience

Cryptocurrency is borderless. Easily make payments from any country to any country.

**Advantages:**

* No currency conversion fees (or very low)
* Save on bank's international transfer fees
* No extra charges for foreign cards
* Same process works in all countries

**Example:**

If you want to buy a US Amazon Gift Card from Bangladesh, you can directly pay with USDT or BNB. No currency conversion or international transfer fees required.

## 💰 4. Low Transaction Costs

Crypto network fees are generally much lower than other methods.

**Cost Comparison:**

* **Credit Card:** 2-3% + international fee
* **Bank Transfer:** $5-20 + conversion fee
* **Crypto (TRX/BNB):** Only $0.10-0.50

**Savings:**

Even more savings on larger purchases. For example, buying a $100 gift card would cost $3+ in credit card fees, but only $0.30-0.50 with crypto.

## ⚡ 5. No Limits or Restrictions

Transact as much as you want without bank or card limitations.

**Banking Problems That Don't Occur:**

* Daily withdrawal limit
* Monthly transaction limit
* Maximum purchase amount
* Account freeze issues
* Suspicious activity flags

**Freedom:**

Your money, use it as you wish. No third-party approval needed.

## 🎯 6. Simple and User-Friendly

Once you set up your wallet, it's very easy thereafter.

**Simple Process:**

1. Select card
2. Choose crypto payment option
3. Connect wallet
4. Confirm
5. Receive code instantly

**Once You Learn:**

While it may take some time the first time, once you learn, all future purchases will be completed in just 30 seconds.

## 🎁 7. Bonuses & Offers

Many platforms offer special discounts or cashback on crypto payments.

**KingsCard Benefits:**

* Special discounts on crypto payments
* Priority fast delivery
* Loyalty rewards for frequent users
* No hidden charges

**Additional Benefits:**

* Sometimes exclusive deals only for crypto users
* Gas fee optimization tips
* 24/7 customer support

## 🤔 Common Questions

**Question: Is buying with crypto safe?**

Yes! We use smart contracts and secure wallet connections. Your funds are completely safe.

**Question: Which cryptocurrencies are accepted?**

We accept USDT (TRC20), BNB (BEP20), and other popular stablecoins.

**Question: How long after payment will I receive the code?**

Usually within 5-30 seconds. Depends on network confirmation.

**Question: How do refunds work?**

If there's any problem, we send refunds to the same wallet address. Usually within 24-48 hours.

## 🎯 Conclusion

Buying gift cards using cryptocurrency is not just modern, but much more convenient, secure, and economical.

**Key Benefits:**

✅ Instant transactions  
✅ Maximum security  
✅ Low cost  
✅ No limits  
✅ International convenience  
✅ User-friendly  
✅ Special offers

Start your crypto journey today and easily buy gift cards from KingsCard!
    `,
    },
    {
        id: 2,
        title: 'How to Redeem Gift Card Codes - Complete Guide',
        excerpt:
            'A detailed guide on how to use your gift card codes on various platforms including Netflix, Google Play, Amazon, and Spotify.',
        image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=500&fit=crop',
        date: 'November 21, 2025',
        author: 'Giftcard Team',
        readTime: '7 min read',
        content: `
# How to Redeem Gift Card Codes - Complete Guide

You've bought a gift card from KingsCard? Now how do you use that code? Let's see how to redeem on different platforms.

## 🎬 How to Redeem Netflix Gift Card

Redeeming gift card codes on Netflix is very simple.

**Steps:**

1. Go to **netflix.com/redeem**
2. Log in to your Netflix account (if not already logged in)
3. Type the gift card code (11 or 14 digits)
4. Click the **Redeem** button
5. Balance will be added to your account

**From Mobile App:**

1. Open Netflix app
2. Go to Account → Redeem Gift Card
3. Enter code and Redeem

**Important Information:**

* Netflix gift cards have no expiration date
* Multiple gift cards can be used together
* Your subscription will automatically stop when balance runs out

## 📱 How to Redeem Google Play Gift Card

Use this code to buy apps, games, movies, and books on Google Play Store.

**On Android Device:**

1. Open **Google Play Store** app
2. Tap on profile icon in the top right corner
3. Select **Payments & subscriptions**
4. Find **Redeem gift code** option
5. Type the gift card code
6. Tap the **Redeem** button

**From Website:**

1. Go to **play.google.com/redeem**
2. Log in to your Google account
3. Enter code and Redeem

**Special Note:**

* Google Play balance only works for the country where the card was issued
* Balance can be used to buy apps, games, subscriptions, movies, everything

## 🛒 How to Redeem Amazon Gift Card

Use gift card balance for shopping on Amazon.

**On Website:**

1. Go to **amazon.com/redeem** or your country's Amazon site
2. Sign in to your Amazon account
3. Write the gift card code in the **Claim Code** box
4. Click the **Apply to Your Balance** button
5. Balance will be added instantly

**On Mobile App:**

1. Open Amazon app
2. Go to **Your Account** from menu (☰)
3. Select **Gift Cards**
4. Tap **Redeem a Gift Card** option
5. Enter code

**How to Use:**

* Gift card balance will be automatically used at checkout
* You can check balance from Payment Methods
* Multiple gift cards can be redeemed together

## 🎵 How to Redeem Spotify Gift Card

Use gift card for Spotify Premium subscription.

**Desktop/Mobile Browser:**

1. Go to **spotify.com/redeem**
2. Log in to your Spotify account (create new account if you don't have one)
3. Enter the gift card code
4. Click the **Redeem** button
5. Premium subscription will be activated

**From Spotify App:**

Unfortunately, you cannot redeem gift cards directly from the Spotify mobile app. You must use a browser.

**Need to Know:**

* Gift cards only get Premium subscription
* Card validity is specific (usually 1, 3, 6, or 12 months)
* Need to renew subscription when balance ends

## 💡 General Tips & Precautions

**✅ Before Redeeming:**

* Type the code correctly (understand difference between O and 0, I and 1)
* Include or exclude spaces in the code as needed (depending on platform)
* Use gift card from the correct region (US, UK, EU, etc.)

**❌ Avoid:**

* Don't share code with anyone
* Don't enter code on phishing sites
* Don't click on suspicious links

**🔒 Security:**

* Only use official websites
* Check confirmation email after redemption
* Save code after redemption (for records)

## 🎁 What to Do If There's a Problem?

**If code doesn't work:**

1. Recheck if you typed the code correctly
2. Make sure the code hasn't been used before
3. Check if you're using the code for the correct region
4. Contact the platform's customer support

Hope this guide helps you redeem your gift cards. If you have any other problems, contact our support team!
    `,
    },
    {
        id: 3,
        title: 'How to Create a Crypto Wallet Easily',
        excerpt:
            "Many users may not know how to create a crypto wallet. That's why our platform provides easy guidelines for beginners.",
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=500&fit=crop',
        date: 'November 20, 2025',
        author: 'Giftcard Team',
        readTime: '5 min read',
        content: `
# How to Create a Crypto Wallet Easily

Many users may not know how to create a crypto wallet. That's why our platform provides easy guidelines for beginners.

## 🔹 Step 1: Download Wallet App

Users can download any of the following popular wallets—

* **Metamask** (Android, iOS, Chrome Extension)
* **TronLink** (Android, iOS, Chrome Extension)
* Or any **WalletConnect**-supported mobile wallet

## 🔹 Step 2: Create Account

When you open the app, pressing the **Create Wallet** button will automatically generate a new wallet.

## 🔹 Step 3: Save Seed Phrase or Recovery Phrase

When the wallet is created, a **12 or 24-word recovery phrase** is shown.

* Write it down on paper and keep it in a safe place
* Never share it online or with anyone

## 🔹 Step 4: Get Some TRX or BNB for Transactions

These are needed for network fees and payments. Users can buy from Exchanges (Binance, OKX, Bybit, etc.) and send to wallet.

## 🔹 Step 5: Wallet Setup Complete

After this, users can easily connect with WalletConnect, TronLink, or MetaMask when making payment on the platform.
    `,
    },
    {
        id: 4,
        title: 'How to Deposit Crypto to Your Wallet',
        excerpt:
            'The process of depositing crypto to a wallet can be divided into three steps— sending money to exchange, buying crypto, and sending to wallet.',
        image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&h=500&fit=crop',
        date: 'November 18, 2025',
        author: 'Giftcard Team',
        readTime: '8 min read',
        content: `
# How to Deposit Crypto to Your Wallet

The process of depositing crypto to a wallet can actually be divided into three steps—

**(1) Sending money to exchange → (2) Buying crypto → (3) Sending to wallet**

The complete process is explained below in simple language:

## 🔹 Step 1: Sending Money (BDT/USD) to Exchange

First, users need to send money to the exchange.
The following methods are commonly used in Bangladesh—

### 1. P2P (People-to-People) System — Most Popular & Easy Method

Binance, Bybit, OKX have P2P options.
Here users can use—

* Their own bank account
* Or mobile banking (bKash, Nagad, Rocket)

**Process:**

1. Open exchange app
2. Go to P2P / Buy Crypto / Express Buy
3. Select Buy USDT
4. Select seller and enter amount
5. Send money to their bank/bKash number
6. Click Payment Done and seller will release USDT

This USDT will later be used to buy TRX or BNB.

## 🔹 Step 2: Buying Crypto (TRX or BNB) on Exchange

Using USDT obtained from P2P:

* **TRX** (for Tron Network)
* **BNB** (for BEP20 Network)

You need to buy either one.

**Process:**

1. Open Trade or Spot option on exchange
2. Find Pair: USDT/TRX or USDT/BNB
3. Click Buy
4. Enter amount and Confirm

Now users have TRX or BNB in their exchange account.

## 🔹 Step 3: Sending Deposit to Your Own Wallet

Now it's time to send funds to wallet:

**Process:**

1. Open your wallet (MetaMask/TronLink/TrustWallet)
2. Click on Receive / Deposit
3. Copy wallet address
   * TRC20 address if Tron
   * BEP20 address if BNB Smart Chain
4. Go to exchange and go to Withdraw
5. Paste address + select correct network
6. Enter amount and press Confirm

**Result:** Money will arrive in wallet within 5-30 seconds.
    `,
    },
];

const BlogPage: React.FC = () => {
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

    const renderContent = (content: string) => {
        const lines = content.trim().split('\n');
        return lines.map((line, index) => {
            // H1
            if (line.startsWith('# ')) {
                return (
                    <h1 key={index} className="text-3xl font-bold text-gray-900 mb-4 mt-6">
                        {line.substring(2)}
                    </h1>
                );
            }
            // H2
            if (line.startsWith('## ')) {
                return (
                    <h2 key={index} className="text-2xl font-bold text-gray-800 mb-3 mt-5">
                        {line.substring(3)}
                    </h2>
                );
            }
            // H3
            if (line.startsWith('### ')) {
                return (
                    <h3 key={index} className="text-xl font-bold text-gray-700 mb-2 mt-4">
                        {line.substring(4)}
                    </h3>
                );
            }
            // Bold text
            if (line.includes('**')) {
                const parts = line.split('**');
                return (
                    <p key={index} className="text-gray-700 mb-3 leading-relaxed">
                        {parts.map((part, i) =>
                            i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                        )}
                    </p>
                );
            }
            // List items
            if (line.trim().startsWith('*') || line.trim().startsWith('-')) {
                return (
                    <li key={index} className="text-gray-700 mb-2 ml-6 leading-relaxed">
                        {line.trim().substring(1).trim()}
                    </li>
                );
            }
            // Numbered list
            if (/^\d+\./.test(line.trim())) {
                return (
                    <li
                        key={index}
                        className="text-gray-700 mb-2 ml-6 leading-relaxed list-decimal"
                    >
                        {line.trim().replace(/^\d+\.\s*/, '')}
                    </li>
                );
            }
            // Empty line
            if (line.trim() === '') {
                return <br key={index} />;
            }
            // Regular paragraph
            return (
                <p key={index} className="text-gray-700 mb-3 leading-relaxed">
                    {line}
                </p>
            );
        });
    };

    if (selectedPost) {
        return (
            <div style={{ backgroundColor: '#FFF8F3', minHeight: '100vh' }}>
                {/* Header */}
                <div
                    style={{
                        background: 'linear-gradient(135deg, #c86028 0%, #e67e42 100%)',
                        padding: '60px 20px',
                        textAlign: 'center',
                        color: 'white',
                    }}
                >
                    <button
                        onClick={() => setSelectedPost(null)}
                        style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            border: '2px solid white',
                            color: 'white',
                            padding: '10px 24px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            marginBottom: '30px',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'white';
                            e.currentTarget.style.color = '#c86028';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                            e.currentTarget.style.color = 'white';
                        }}
                    >
                        ← All Blogs
                    </button>
                    <h1
                        style={{
                            fontSize: '42px',
                            fontWeight: 'bold',
                            marginBottom: '20px',
                            lineHeight: '1.2',
                        }}
                    >
                        {selectedPost.title}
                    </h1>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '30px',
                            flexWrap: 'wrap',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <CalendarIcon size={18} />
                            <span>{selectedPost.date}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <UserIcon size={18} />
                            <span>{selectedPost.author}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ClockIcon size={18} />
                            <span>{selectedPost.readTime}</span>
                        </div>
                    </div>
                </div>

                {/* Article Content */}
                <div style={{ maxWidth: '900px', margin: '-50px auto 0', padding: '0 20px 80px' }}>
                    <div
                        style={{
                            background: 'white',
                            borderRadius: '16px',
                            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden',
                        }}
                    >
                        <img
                            src={selectedPost.image}
                            alt={selectedPost.title}
                            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                        />
                        <div style={{ padding: '50px 40px' }}>
                            <div className="blog-content">
                                {renderContent(selectedPost.content)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: '#FFF8F3', minHeight: '100vh' }}>
            {/* Hero Section */}

            <Hero />
            {/* Blog Grid */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px' }}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '40px',
                    }}
                >
                    {blogPosts.map(post => (
                        <div
                            key={post.id}
                            style={{
                                background: 'white',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow =
                                    '0 12px 40px rgba(200, 96, 40, 0.2)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                            }}
                            onClick={() => setSelectedPost(post)}
                        >
                            <div
                                style={{
                                    position: 'relative',
                                    overflow: 'hidden',
                                    height: '250px',
                                }}
                            >
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.3s ease',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                />
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '15px',
                                        right: '15px',
                                        background: '#c86028',
                                        color: 'white',
                                        padding: '8px 16px',
                                        borderRadius: '20px',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    New
                                </div>
                            </div>

                            <div style={{ padding: '30px' }}>
                                <h2
                                    style={{
                                        fontSize: '22px',
                                        fontWeight: 'bold',
                                        color: '#2d2d2d',
                                        marginBottom: '15px',
                                        lineHeight: '1.4',
                                    }}
                                >
                                    {post.title}
                                </h2>

                                <p
                                    style={{
                                        color: '#666',
                                        fontSize: '15px',
                                        lineHeight: '1.6',
                                        marginBottom: '20px',
                                    }}
                                >
                                    {post.excerpt}
                                </p>

                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingTop: '20px',
                                        borderTop: '1px solid #FFE5D9',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            gap: '15px',
                                            fontSize: '14px',
                                            color: '#888',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                            }}
                                        >
                                            <CalendarIcon size={16} />
                                            <span>{post.date}</span>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                            }}
                                        >
                                            <ClockIcon size={16} />
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            color: '#c86028',
                                            fontWeight: 'bold',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                        }}
                                    >
                                        Read More <RightArrowIcon size={18} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
