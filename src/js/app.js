window.addEventListener('load', () => {
    const url = $('#url').attr('data-url');
    if(url.length > 0) {
        const failed = function () {
            const $listWrapper = $('#list');
            $listWrapper.empty();
            $listWrapper.text('データの読み込みに失敗しました。');
        };
        $.ajax({
            url: url,
            type: 'get',
            cache: false,
            dataType: 'json',
        })
            .then((...args) => {
                const [data, textStatus, jqXHR] = args;
                console.log(data);
                if (data.status !== 200) {
                    failed();
                    console.log('error: ' + data.message);
                } else {
                    if (data.data.length > 0) {
                        const $listWrapper = $('#list');
                        const $ol = $('<ol/>');
                        data.data.forEach((elm) => {
                            const $li = $('<li/>');
                            $li.text(`${elm.title} / ${elm.disc}`);
                            $ol.append($li);
                        });
                        $listWrapper.append($ol);
                        console.log('succeed');
                    } else {
                        failed();
                        console.log('error: contents is empty.');
                    }
                }
            })
            .catch((...args) => {
                const [jqXHR, textStatus, errorThrown] = args;
                console.log('failed: ', jqXHR.statusText);
                failed();
            })
            .then(() => {
                console.log('end');
            });
    }
});
