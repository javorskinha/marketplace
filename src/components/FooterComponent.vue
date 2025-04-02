<template>
    <div>
        <div class="footer-content">
            <div>
                <div>
                    <div class="logo-content">
                        <h2>S+mart</h2>
                    </div>
                    <p class="logo-text">O seu ponto de referência para produtos exclusivos e uma jornada de compras incrível.</p>
                </div>
                <div class="social">
                    <i class="pi pi-whatsapp"></i>
                    <i class="pi pi-facebook"></i>
                    <i class="pi pi-instagram"></i>
                </div>
            </div>
            <div class="about">
                <div class="list">
                    <h3>Compras</h3>
                    <ul>
                        <li>Todos os Produtos</li>
                        <li>Novidades</li>
                        <li>Promoções</li>
                    </ul>
                </div>
                <div class="list">
                    <h3>Companhia</h3>
                    <ul>
                        <li>Sobre</li>
                        <li>Afiliados</li>
                        <li>Sustentabilidade</li>
                    </ul>
                </div>
                <div class="list">
                    <h3>Suporte</h3>
                    <ul>
                        <li>Fale Conosco</li>
                        <li>Solução de problemas</li>
                        <li>Segurança</li>
                    </ul>
                </div>
            </div>
        </div>
        <hr>
        <div class="terms">
            <p>© 2023 Marketplace. Diretos Reservados.</p>
            <ul>
                <li>Politica de Privacidade</li>
                <li>Termos de Serviço</li>
                <li>Politica de Cookies</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .logo-content{
        max-width: 100px;
        margin: 2em 0.7em 0.5em;
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
        color: var(--color-gray);
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
        background-color: var(--color-light-gray);
    }

    .terms ul{
        display: flex;
        color: var(--color-gray);
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