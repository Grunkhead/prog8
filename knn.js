// kNear
const usePretrainedModel = true
let features, knn, video, labelP
let label = 'nothing'
let trainingData = []

function setup() {
    video = createCapture()
    video.size(300, 300)
    
    features = ml5.featureExtractor('MobileNet', function() {

        if (usePretrainedModel) {
            knn.load('models/pretrainedModel.json', function() {
                console.log('Pretrained model loaded.')
                classify()
            });
        } else {
            console.log('Newly model created, ready for training!')
        }

    });

    knn = ml5.KNNClassifier()
    // labelP = createP('Waiting for you to give instructions.. give a pose and press WASDE')
}


function classify() {

    const logits = features.infer(video)

    knn.classify(logits, function (error, result) {

        if (error) {
            console.error(error)
        } else {
            label = result.label
            // labelP.html(result.label)
            classify()
        }
    });
}

const save = (knn, name) => {

    const dataset = knn.knnClassifier.getClassifierDataset()

    if (knn.mapStringToIndex.length > 0) {
        Object.keys(dataset).forEach(key => {
            if (knn.mapStringToIndex[key]) {
                dataset[key].label = knn.mapStringToIndex[key]
            }
        });
    }

    const tensors = Object.keys(dataset).map(key => {

        const t = dataset[key];

        if (t) {
            return t.dataSync()
        }

        return null
    });

    let fileName = 'pretrainedModel.json';

    if (name) {
        fileName = name.endsWith('.json') ? name : `${name}.json`
    }

    saveFile(fileName, JSON.stringify({
        dataset,
        tensors
    }));
};

const saveFile = (name, data) => {

    const downloadLink = document.createElement('a');
    const url = URL.createObjectURL(new Blob([data], {
        type: 'octet/stream'
    }));

    downloadLink.setAttribute('href', url);
    downloadLink.setAttribute('download', name);
    downloadLink.style.display = 'block';

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    URL.revokeObjectURL(url);
};