Distribution expressions to sweep over values of model settings.
<example>
Some examples are:
<code>
ModelName = "choice('seresnext', 'resnest50')";
LearningRate = "uniform(0.001, 0.01)";
LayersToFreeze = "choice(0, 2)";
</code></example>
For more details on how to compose distribution expressions please check the documentation:
https://docs.microsoft.com/en-us/azure/machine-learning/how-to-tune-hyperparameters
For more information on the available settings please visit the official documentation:
https://docs.microsoft.com/en-us/azure/machine-learning/how-to-auto-train-image-models.