---
layout: page
title: "CUDA Matrix-multiplication"
permalink: /projects/matrix-multiplication-CUDA/
---

<link rel="stylesheet" href="/assets/css/media.css">
<link rel="stylesheet" href="/assets/css/section-highlight.css">

<div class="section-title-wrapper">
  <h2 class="section-title">{{ page.title }}</h2>
</div>

<section class="outlined-section-wrapper">
  <section class="outlined-section">
      <div class="feature-media">
        <div class="youtube-video-container">
          <iframe src="https://www.youtube.com/embed/hxwUSdSztdM" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
      <div class="feature-content">
        <h3><b>My Work</b></h3>
        <ul>
          <li>Neural network (NN) trained for number recognition</li>
          <li>Writing feedforward and backpropogation kernels in CUDA</li>
          <li>GPU implementation of NN logic using CUDA kernels</li>
          <li>Optimization of GPU kernels</li>
          <li>Profiling using NSight Compute</li>
        </ul>
        <p>
          You can check out a blogpost I made on this project using the following link: <a href="https://medium.com/@robinheijmans/building-a-matrix-multiplication-kernel-from-scratch-using-cuda-and-applying-it-to-neural-networks-8da95a296de5" target="_blank" rel="noopener noreferrer">building a matrix-multiplication kernel from scratch using CUDA and applying it to neural networks</a>. This project was made in <b>custom engine</b>, where the engine is C++ and the CUDA kernels use hlsl for the compute shaders.
        </p>
      </div>
  </section>
</section>

<section class="outlined-section-wrapper">
  <section class="outlined-section">
    <h3><b>Performance Of Matrix Multiplication On The GPU</b></h3>
    <p>
    Matrix multiplication is the core of neural networks, this is how the input you use traverses the NN until it reaches the end and is returned. The multiplication of matrices on the GPU has been optimized a lot and there are many sources online that explain different optimizations. The main source I used was: OpenCL SGEMM tuning for Kepler. It explains the concepts of the optimizations in an easy to understand and visual way. Eventhough it uses OpenCL, it is easily translated to CUDA. We will go over a couple of optimization steps, that I have implemented in my matrix multiplication kernel. If you are unfamiliar with how the GPU works, then I recommend checking out the <a href="https://medium.com/@robinheijmans/building-a-matrix-multiplication-kernel-from-scratch-using-cuda-and-applying-it-to-neural-networks-8da95a296de5" target="_blank" rel="noopener noreferrer">article</a> I wrote, it contains a short introduction into how the GPU works.
    </p>
    <section class="feature-block media-left">
      <div class="feature-media" style="flex: 1 1 30%;">
        <figure>
          <img src="assets/images/gemm/GEMM_1.png" alt="gemm1">
          <figcaption>Visualization of matrix multiplication.</figcaption>
        </figure>
      </div>
      <div class="feature-content">
      <p>
        Matrix multiplication is taking the dot product between a row from matrix A and a column from matrix B to get the value of the element of the output matrix C in the corresponding row and column. In the adjacent image there is a visualization used in the tutorial that shows this concept. Implementing this on the GPU is easy enough, but it is not very fast. The main cause for this is the amount of global memory loads per <i>thread</i>.
      </p>
      </div>
    </section>
    <section class="feature-block media-right">
      <div class="feature-media" style="flex: 1 1 40%;">
        <figure>
          <img src="assets/images/gemm/GEMM_2.png" alt="gemm2">
          <figcaption>Visualization of tile based matrix multiplication.</figcaption>
        </figure>
      </div>
      <div class="feature-content">
        <p>
          We can minimize global memory reads by using shared memory, we read sub-blocks of matrices A and B into shared memory and execute the dot product calculation for these smaller sub-blocks (tiles). We can use these tiles to step over the entirety of matrices A and B. You can set the value of an element in the tile to 0, if the tile size does not allign perfectly with the rows and culumns to account for overshoot.
        </p>
        <p>
          The next optimization step is increasing the workload per thread. While tile based matrix multiplication is already an improvement to basic matrix multiplication, it is not utilizing the GPU to its fullest. The following step makes better use of the GPU, by increasing the arithmetic intensity (more instructions per read from memory) for each thread and reducing the number of threads. 
        </p>
      </div>
    </section>
    <p>
    In the image below, the highlighted row from matrix A has to be used for each column of matrix B, to calculate the values for each element in that row in matrix C. To minimize the memory reads from matrix A, it is possible to read the row from matrix A once and use it for multiple columns of matrix B before reading another row from matrix A. Only 3 columns are used at a time in the image below, once these three columns have been used for the dot product computation, three new columns will be stored in shared memory.
    </p>
    <p>
    For simplicity the example does not consider the tiling optimization done before, but the same concept of this step can be applied to the tiles used in tile based GEMM. Instead of storing an entire row and columns, you read parts of them depending on the tile size.
    </p>
    <figure>
      <img src="assets/images/gemm/GEMM_3.png" alt="gemm3">
      <figcaption>Visualization of increased workload matrix multiplication.</figcaption>
    </figure>
  </section>
</section>

<section class="outlined-section-wrapper">
  <section class="outlined-section">
  <h3><b>Matrix Multiplication In Neural Networks</b></h3>
  <p>
    Now that we have a basic understanding of the GPU and how to utilize the GPU for matrix multiplication, we can take a look at how this applies to NNs. The architecture of a multi layer peceptron (NN) is given in the image below. Some input goes in, passes through the NN and gives some output. Passing through the NN (forward propogation), is something that happens layer after layer, starting from the input layer, continuing through all the hidden layers and finally finishes with the output layer. The computation that happens to go from one layer to the next is matrix multiplication and the values of all neurons (nodes in a layer) are independent from the other neurons in the same layer. So they can be done in parallel and the GPU is perfect for this.
  </p>
  <figure>
    <img src="assets/images/gemm/neural-network.png" alt="nn" width="400">
    <figcaption>Neural network architecture example.</figcaption>
  </figure>
    <section class="feature-block media-right">
      <div class="feature-media" style="flex: 1 1 50%;">
        <figure>
          <img src="assets/images/gemm/FullyConnectedLayer_NvidaDocs_complete.png" alt="fcl-complete">
          <figcaption>a: forward propogation, b: activation gradient, c: weight gradient computations of a fully-connected layer.</figcaption>
        </figure>
      </div>
      <div class="feature-content">
        <p>
          Using this method to move from layer to layer is the state-of-the-art method used by PyTorch, Caffe and Tensorflow according to the Nvidia documentation (Fully-connected layer Nvidia docs). The adjacent image shows the matrices used as inputs to determine the output for different computations of the NN. Forward propogation (a) is used to test the GEMM kernel I have made, but the other computations are important for backpropogation (training of a NN).
        </p>
      </div>
    </section>
  </section>
</section>

<section class="outlined-section-wrapper">
  <section class="outlined-section">
  <h3><b>CPU vs GPU</b></h3>
  <p>
    The main reason to use the GPU for NN computations is because it is faster than the CPU, if implemented correctly. So it is important to compare the GPU implementation to a CPU implementation I had made before. To perform this comparison I used a batch size of 256 and network size of:
    <ul>
      <li>Input layer: 784</li>
      <li>Hidden layer: 100 (relu)</li>
      <li>Hidden layer: 100 (relu)</li>
      <li>Output layer: 10 (softmax)</li>
    </ul>
    I tried to utilize the streaming multiprocessors (SM) of the GPU to its fullest, by using a tile size based on the SM size of my GPU. I have a SM of 32 threads, so I used a tile size of 16, allowing the SMs to execute a fitting number of threads in a wave (minimal amount of inactive threads). The following table shows the results.
  </p>
  <table class="tg">
    <thead>
      <tr>
        <th class="tg-0lax"><span style="font-weight:bold">Version</span></th>
        <th class="tg-0lax"><span style="font-weight:bold">Duration (ms)</span></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="tg-0lax">CPU</td>
        <td class="tg-0lax">22</td>
      </tr>
      <tr>
        <td class="tg-0lax">GPU (tile-based GEMM)</td>
        <td class="tg-0lax">43.22</td>
      </tr>
      <tr>
        <td class="tg-0lax">GPU (more work per thread)</td>
        <td class="tg-0lax">21.25</td>
      </tr>
      <tr>
        <td class="tg-0lax">GPU (more WPT + improved memory access pattern)</td>
        <td class="tg-0lax">6.5</td>
      </tr>
    </tbody>
  </table>
  <p>
    The tile based matrix multiplication implementation I had made was about 2 times slower than the CPU version. This was mostly because of a poor utilization of the GPU. By profiling the kernel (with Nsight Compute) I was able to determine the bottlenecks and improve the performance. Improving the matrix multiplication made the kernel about the same speed as the CPU version, but there were still some big bottlenecks regarding memory access patterns. A lot of time was spent idle on the <i>threads</i>, waiting for data. The data I stored in shared memory was uncoalesced, meaning I was accessing a value of the stored matrix, then had to jump a couple of bytes in memory to find the next value. I coalesced the data in memory by changing the memory access pattern. Now when accessing data in memory, I can read a value and the next value I need is adjacent to the read value (no more jumping of bytes to find the correct value). The resulting kernel is <i>70.45%</i> faster than the CPU version, which is a significant performance improvement.
  </p>
  <h3><b>Demo</b></h3>
  <p>
  I made a small demo using the matrix multiplication kernel for forward propogation of a trained NN, to demonstrate the kernel in action. The user can draw a digit in the ImGui window and the NN tries to classify the drawn digit in real time.
  </p>
  <div class="feature-media">
    <div class="youtube-video-container">
      <iframe src="https://www.youtube.com/embed/hxwUSdSztdM" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>
  </section>
</section>
