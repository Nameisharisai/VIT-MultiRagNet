# ViT-MultiRAGNet

**Retrieval-Augmented Transformer Framework for Multi-Modal Mammogram Classification**

[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![PyTorch 2.0](https://img.shields.io/badge/pytorch-2.0-orange.svg)](https://pytorch.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## Abstract

Mammographic breast cancer diagnosis faces persistent challenges due to variable acquisition protocols, diverse lesion appearances, and limited integration of patient historical data. **ViT-MultiRAGNet** is a multimodal deep learning framework that combines multi-view mammograms, volumetric scans, and clinical metadata through **Retrieval-Augmented Generation (RAG)**. The approach improves diagnostic accuracy by integrating spatial features, structural information, semantic cues, and evidence from historically similar cases retrieved during inference.

### Key Results

| Dataset     | Accuracy       | AUC-ROC        | Dice Coefficient | Inference Time |
|-------------|----------------|----------------|------------------|----------------|
| **RTM**     | 0.978 ± 0.011  | 0.998 ± 0.009  | 0.882 ± 0.008    | 0.31 s/image   |
| **CBIS-DDSM** | 0.957 ± 0.012 | 0.989 ± 0.010  | 0.795 ± 0.009    | 0.31 s/image   |

---

## Table of Contents

- [Introduction](#introduction)
- [Key Contributions](#key-contributions)
- [Architecture](#architecture)
- [Installation](#installation)
- [Datasets](#datasets)
- [Usage](#usage)
- [Results](#results)
- [Ablation Studies](#ablation-studies)
- [Citation](#citation)
- [Acknowledgements](#acknowledgements)
- [License](#license)

---

## Introduction

Early detection and accurate characterization of breast lesions remain essential for optimizing patient outcomes. Existing computer-aided systems typically operate on limited data subsets, evaluate modalities independently, and function as closed systems lacking access to knowledge repositories—thereby missing the contextual integration and comparative reasoning fundamental to expert clinical decision-making.

**ViT-MultiRAGNet** addresses these limitations by:
- Integrating heterogeneous information modalities (multi-view mammograms, volumetric imaging, clinical metadata)
- Implementing historical case referencing through RAG mechanisms
- Providing transparent, evidence-based diagnostic reasoning

---

## Key Contributions

1. **Integrated Multimodal Framework with RAG**: A deep learning architecture combining multi-view mammographic images, volumetric 3D breast scans, patient clinical metadata, and historical case retrieval within a single end-to-end trainable model.

2. **Vision Transformer-Based Global Feature Extraction**: Customized ViT encoder optimized for mammographic analysis, enabling global feature learning through pure self-attention that captures extended spatial dependencies.

3. **Retrieval-Augmented Generation Mechanism**: Memory-augmented diagnostic module maintaining an encoded knowledge repository, dynamically retrieving similar historical cases during inference via multi-head cross-attention fusion.

4. **Volumetric 3D Convolutional Encoder**: Specialized 3D CNN branch for volumetric breast imaging (DBT, MRI), enabling learning of inter-slice spatial continuity.

5. **Evidence-Based Interpretable Diagnosis**: Explicit identification and visualization of retrieved reference cases, enabling clinicians to understand model reasoning through concrete historical precedents.

6. **Superior Performance with Clinical Interpretability**: State-of-the-art performance (Accuracy = 0.978, AUC = 0.998, Dice = 0.882) with enhanced detection of challenging lesions.

---

## Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ViT-MultiRAGNet Architecture                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                   │
│  │  Multi-View  │    │  Volumetric  │    │   Clinical   │                   │
│  │ Mammograms   │    │  3D Scans    │    │   Metadata   │                   │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘                   │
│         │                   │                   │                            │
│         ▼                   ▼                   ▼                            │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                   │
│  │ ViT Encoder  │    │ 3D CNN       │    │ MLP Encoder  │                   │
│  │ (16x16 patch)│    │ Encoder      │    │              │                   │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘                   │
│         │                   │                   │                            │
│         └─────────┬─────────┴─────────┬─────────┘                            │
│                   │                   │                                      │
│                   ▼                   ▼                                      │
│            ┌─────────────┐    ┌──────────────┐                              │
│            │ RAG Module  │◄───│ Memory Bank  │                              │
│            │ (Top-K      │    │ (Historical  │                              │
│            │  Retrieval) │    │  Cases)      │                              │
│            └──────┬──────┘    └──────────────┘                              │
│                   │                                                          │
│                   ▼                                                          │
│         ┌─────────────────────┐                                             │
│         │ Multi-Head Cross-   │                                             │
│         │ Attention Fusion    │                                             │
│         └─────────┬───────────┘                                             │
│                   │                                                          │
│         ┌─────────┴───────────┐                                             │
│         │                     │                                              │
│         ▼                     ▼                                              │
│  ┌──────────────┐     ┌──────────────┐                                      │
│  │ Classifier   │     │ Segmentation │                                      │
│  │ (Benign/     │     │ Decoder      │                                      │
│  │  Malignant)  │     │ (U-Net style)│                                      │
│  └──────────────┘     └──────────────┘                                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Core Components

| Component | Description |
|-----------|-------------|
| **ViT Encoder** | 12-layer Vision Transformer with 16×16 patch embedding, 768-dim embeddings, 12 attention heads |
| **Memory Bank** | Stores encoded feature representations (keys/values) from training samples |
| **RAG Module** | Retrieves top-k similar historical cases via cosine similarity |
| **Cross-Attention Fusion** | Multi-head attention fusing visual, retrieved, and clinical features |
| **Segmentation Decoder** | U-Net style decoder with progressive upsampling |
| **Classifier** | MLP head for benign/malignant classification |

### Mathematical Formulation

**RAG Module Retrieval:**
```
Q = f_enc(x)                                              # Query from ViT encoder
Similarity(Q, K_mem) = (Q · K_mem) / (||Q|| × ||K_mem||)  # Cosine similarity
α_i = SoftMax(Similarity Scores)                          # Attention weights
Retrieved Context = Σ α_i × V_mem,i                       # Weighted combination
```

**Multi-Head Cross-Attention Fusion:**
```
F_fused = CrossAttention(Q=F_visual, K=F_retrieved ⊕ F_clinical, V=F_retrieved ⊕ F_clinical)
```

---

## Installation

### Requirements

- Python 3.8+
- PyTorch 2.0+
- CUDA 11.7+ (for GPU acceleration)

### Setup

```bash
# Clone the repository
git clone https://github.com/Nameisharisai/VIT-MultiRagNet.git
cd VIT-MultiRagNet

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -q kaggle pandas numpy scikit-learn opencv-python matplotlib \
               albumentations scikit-image scipy torch torchvision tqdm
```

### Dependencies

| Package        | Version  | Purpose                          |
|----------------|----------|----------------------------------|
| torch          | ≥2.0     | Deep learning framework          |
| torchvision    | ≥0.15    | Vision utilities                 |
| albumentations | ≥1.3     | Data augmentation                |
| opencv-python  | ≥4.7     | Image processing                 |
| scikit-learn   | ≥1.2     | Metrics and cross-validation     |
| pandas         | ≥1.5     | Data manipulation                |
| numpy          | ≥1.23    | Numerical operations             |
| scipy          | ≥1.10    | Wiener filtering                 |
| scikit-image   | ≥0.20    | Image processing utilities       |
| matplotlib     | ≥3.7     | Visualization                    |
| tqdm           | ≥4.65    | Progress bars                    |

---

## Datasets

### CBIS-DDSM (Curated Breast Imaging Subset of DDSM)

- **Size**: 10,239 digitized screening mammograms
- **Content**: Masses and microcalcifications with pathology-verified labels
- **Format**: DICOM with ground truth segmentation masks
- **Source**: [Kaggle - CBIS-DDSM](https://www.kaggle.com/datasets/awsaf49/cbis-ddsm-breast-cancer-image-dataset)

### RTM (Real Time Mammogram) Dataset

- **Size**: 10,063 digitized screening mammograms
- **Patients**: ~1,416 patients from cancer hospitals in Andhra Pradesh and Karnataka
- **Categories**: Normal, Benign, Malignant
- **Annotations**: Comprehensive radiologist transcribed notes

### Data Partitioning

```
├── Training:   70%  (Memory bank construction + model training)
├── Validation: 15%  (Hyperparameter tuning)
└── Testing:    15%  (Final evaluation)
```

---

## Usage

### Data Preprocessing Pipeline

The preprocessing pipeline includes:

1. **Image Standardization** → Resize to 512×512 with aspect-ratio-preserving padding
2. **Noise Reduction** → Wiener filtering (3×3 window)
3. **Contrast Enhancement** → CLAHE (clip limit=2.0, grid=8×8)
4. **Boundary Segmentation** → Otsu thresholding + morphological filtering
5. **Intensity Normalization** → Z-score standardization (mean=0, std=1)

### Training

```python
# Two-stage training approach

# Stage 1: Segmentation Training (200 epochs)
train_segmentation(
    model=model,
    train_loader=train_seg_loader,
    val_loader=val_seg_loader,
    device=device,
    epochs=200,
    lr=1e-4
)

# Build Memory Bank from trained encoder
memory_bank = build_memory_bank(model, train_loader, device)

# Stage 2: Classification Training with RAG (100 epochs)
train_classification(
    model=model,
    memory_bank=memory_bank,
    train_loader=train_cls_loader,
    val_loader=val_cls_loader,
    device=device,
    epochs=100,
    lr=1e-4
)
```

### Inference

```python
model.load_state_dict(torch.load("best_classification.pth"))
model.eval()

with torch.no_grad():
    logits_cls, logits_seg, retrieved_idx = model(
        imgs, 
        memory_bank=memory_bank, 
        topk=5
    )
    probs = torch.softmax(logits_cls, dim=-1)[:, 1]
    predictions = (probs > 0.5).long()
```

---

## Results

### Classification Performance

| Model              | CBIS-DDSM AUC | RTM AUC | CBIS-DDSM Acc | RTM Acc |
|--------------------|---------------|---------|---------------|---------|
| ResNet-50          | 0.922         | 0.940   | 0.873         | 0.900   |
| Swin-T             | 0.950         | 0.970   | 0.910         | 0.940   |
| **ViT-MultiRAGNet**| **0.987**     | **0.998**| **0.961**    | **0.978**|

### Segmentation Performance

| Model              | CBIS-DDSM Dice | RTM Dice | HD95 (mm) |
|--------------------|----------------|----------|-----------|
| U-Net              | 0.749          | 0.820    | 6.57      |
| TransUNet          | 0.765          | 0.850    | 5.12      |
| Swin-UNet          | 0.772          | 0.865    | 4.89      |
| **ViT-MultiRAGNet**| **0.795**      | **0.882**| **2.81**  |

### F1-Score Comparison

| Model              | CBIS-DDSM F1 | RTM F1 |
|--------------------|--------------|--------|
| ResNet3D           | 0.678        | 0.742  |
| DenseNet3D         | 0.721        | 0.784  |
| Vision Transformer | 0.601        | 0.689  |
| Swin-T v2          | 0.756        | 0.812  |
| **ViT-MultiRAGNet**| **0.933**    | **0.969**|

### Computational Efficiency

| Metric                    | Value           |
|---------------------------|-----------------|
| Total Parameters          | 89.1 M          |
| Trainable Parameters      | 86.7 M          |
| Inference Latency         | 0.28 s/image    |
| Inference Memory          | 6.8 GB          |
| FLOPs                     | 40.2 GFLOPs     |
| Model Size                | 342 MB          |
| Memory Bank Size          | 2.3 GB          |
| Throughput                | 12,857 samples/hour |

---

## Ablation Studies

### Component Contribution Analysis (RTM Dataset)

| Configuration           | Accuracy | AUC   | Dice  | Δ Accuracy |
|-------------------------|----------|-------|-------|------------|
| Full ViT-MultiRAGNet    | 0.978    | 0.996 | 0.971 | —          |
| w/o RAG Module          | 0.912    | 0.981 | 0.934 | **-6.6%**  |
| w/o ViT Encoder         | 0.821    | 0.776 | 0.712 | **-16.0%** |
| w/o 3D Encoder          | 0.851    | 0.798 | 0.756 | **-13.0%** |
| w/o Clinical Data       | 0.891    | 0.963 | 0.898 | **-8.9%**  |

**Key Findings:**
- RAG module removal causes 6.6% accuracy drop → validates retrieval mechanism importance
- ViT encoder is critical → 16% degradation without global attention
- All modalities contribute meaningfully to final performance

---

## Hyperparameters

### Optimal Configuration

| Parameter              | Segmentation | Classification |
|------------------------|--------------|----------------|
| Input Size             | 512×512      | 512×512        |
| Patch Size             | 16×16        | 16×16          |
| Batch Size             | 8            | 16             |
| Learning Rate          | 1e-4         | 1e-4           |
| Optimizer              | AdamW        | AdamW          |
| Weight Decay           | 0.01         | 0.01           |
| Retrieval Top-K        | 5            | 5              |
| ViT Depth              | 12 layers    | 12 layers      |
| Embedding Dimension    | 768          | 768            |
| Attention Heads        | 12           | 12             |
| Dropout                | 0.1          | 0.1            |
| Epochs                 | 200          | 100            |
| Early Stopping         | patience=20  | patience=15    |

---

## Project Structure

```
VIT-MultiRagNet/
├── VIT-MultiRAGnet.ipynb       # Main notebook with full implementation
├── README.md                   # This file
├── requirements.txt            # Python dependencies
├── assets/                     # Figures and diagrams
│   ├── architecture_diagram.png
│   ├── roc_curves.png
│   └── confusion_matrices.png
├── models/                     # Saved model weights
│   ├── best_segmentation.pth
│   └── best_classification.pth
└── data/                       # Dataset directory (not tracked)
    └── cbis_ddsm_main/
```

---

## Citation

If you find this work useful, please cite:

```bibtex
@article{vitmultiragnet2025,
  title={ViT-MultiRAGNet: Retrieval-Augmented Transformer Framework 
         for Multi-Modal Mammogram Classification},
  author={[Authors]},
  journal={[Journal]},
  year={2025},
  note={Accuracy=0.978, AUC=0.998 on RTM dataset}
}
```

---

## Acknowledgements

This work was supported by **DST-SERB** (Department of Science and Technology—Science and Engineering Research Board), Government of India, under Category EMEQ, Project File No. **EEQ/2023/000053**.

---

## References

1. Dosovitskiy, A., et al. (2020). "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale." *ICLR*.

2. Lewis, P., et al. (2020). "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks." *NeurIPS*.

3. Liu, Z., et al. (2021). "Swin Transformer: Hierarchical Vision Transformer using Shifted Windows." *ICCV*.

4. Chen, X., et al. (2022). "Transformers Improve Breast Cancer Diagnosis from Multi-View Mammograms." *Medical Image Analysis*.

5. Enes, B.E., et al. (2024). "Cross-attention Guided Loss-Based Deep Dual-Branch Transformer Network." *IEEE TMI*.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <b>ViT-MultiRAGNet</b> — Advancing Transparent, Evidence-Based AI for Breast Cancer Diagnosis
</p>