<script>
    import { onMount } from 'svelte';
    import { CHART } from "../../constants/letters";

    onMount(async () => {
        const flattenH = getFlatSet("hiragana")
        const flattenK = getFlatSet("katakana")

        const marks = ["images/marks/-.png"]

        const flatten = [...flattenH, ...flattenK, ...marks]
        
        const images = flatten.filter(img => img)

        try {
            await Promise.all(images.map(loadImage));
        } catch (error) {
            console.error('Error img load:', error);
        }
        });

        function loadImage(src) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = reject;
                img.src = src;
        });
    }

    function getFlatSet(kana) {
        return CHART.map(set => {
            return set.map(char => {
                if(char) {
                    return `images/${kana}/${char}.png`
                }
            })
        }).flat()
    }
</script>