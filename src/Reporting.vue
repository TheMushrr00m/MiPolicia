<template>
    <div class="soon">
        <b-icon class="soon-icon" icon="watch_later"></b-icon>
        <p>Próximamente...</p>
    </div>
</template>

<script>
    export default {
        beforeCreate(){
            if (window.location.protocol === 'https:') {
                window.location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
            }
        }
    }
</script>

<style>
    .soon{
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        align-items: center;
    }
    .soon-icon{
        margin-bottom: 0.5em;
    }
</style>