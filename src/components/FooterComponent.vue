<template>
    <div>
        <div class="footer-content">
            <div>
                <div>
                    <div class="logo-content">
                        <h2>S+mart</h2>
                    </div>
                    <p class="logo-text">Your destination for premium products and exceptional shopping experiences.</p>
                </div>
                <div class="social">
                    <i class="pi pi-whatsapp"></i>
                    <i class="pi pi-facebook"></i>
                    <i class="pi pi-instagram"></i>
                </div>
            </div>
            <div class="about">
                <div class="list">
                    <h3>Shop</h3>
                    <ul>
                        <li>All Products</li>
                        <li>New Arrivals</li>
                        <li>Sale Items</li>
                    </ul>
                </div>
                <div class="list">
                    <h3>Company</h3>
                    <ul>
                        <li>About Us</li>
                        <li>Careers</li>
                        <li>Affiliates</li>
                    </ul>
                </div>
                <div class="list">
                    <h3>Support</h3>
                    <ul>
                        <li>Contact Us</li>
                        <li>FAQs</li>
                        <li>Returns</li>
                    </ul>
                </div>
            </div>
        </div>
        <hr>
        <div class="terms">
            <p>© 2023 Marketplace. All rights reserved.</p>
            <ul>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .logo-content{
        display: flex;
        max-width: 130px;
        margin: 0.5em;
        margin-top: 2em;
        align-items: center;
        justify-content: space-around;
    }

    .logo-content img {
        width: 2em;
    }

    .logo-text{
        text-align: justify;
        margin: 3px 1em;
    }

    .social{
        display: flex;
        max-width: 130px;
        justify-content: space-around;
        padding: 15px 0;
    }

    .about{
        color: var(--color-medium-purple);
        display: flex;
        justify-content: space-between;
        margin: 30px 10px 60px 10px;
        width: 400px;
    }

    .list{
        min-width: 150px;
    }

    .list h3{
        margin-bottom: 15px;
    }

    .list li{
        margin: 5px;
    }

    .terms{
        text-align: center;
        height: 4em;
        padding: 3em 0;
        background-color: var(--color-super-light-purple);
    }

    .terms ul{
        display: flex;
        color: var(--color-medium-purple);
        justify-content: space-around;
        margin-top: 20px;
    }

    @media screen and (min-width: 600px) {
        .footer-content{
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .social{
            width: 8em;
        }

        .terms ul{
            padding: 0 25%;
        }
    }

    @media screen and (min-width: 1200px) {
        .footer-content{
            flex-direction: row;
            justify-content: space-around;
            align-items: baseline;
            padding: 0 10%;
        }

        .social{
            align-items: center;
            font-size: 1.3em;
        }

        .terms ul {
            padding: 0 30%;
        }
    }
</style>