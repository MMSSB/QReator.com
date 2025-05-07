 // Initialize QR Code instance
 const qrCode = new QRCodeStyling({
    width: 200,
    height: 200,
    data: "https://mmssb.github.io/QReator.com",
    dotsOptions: {
        color: "#000000",
        type: "square"
    },
    backgroundOptions: {
        color: "#FFFFFF",
    },
    cornersSquareOptions: {
        type: "square"
    },
    cornersDotOptions: {
        type: "square"
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 10
    }
});

// DOM Elements
const codeType = document.getElementById('codeType');
const inputFields = document.getElementById('inputFields');
const qrStyleOptions = document.getElementById('qrStyleOptions');
const dotsStyle = document.getElementById('dotsStyle');
const cornerSquaresStyle = document.getElementById('cornerSquaresStyle');
const cornerDotsStyle = document.getElementById('cornerDotsStyle');
const dotsColor = document.getElementById('dotsColor');
const dotsGradient = document.getElementById('dotsGradient');
const dotsGradientColors = document.getElementById('dotsGradientColors');
const dotsGradientColor1 = document.getElementById('dotsGradientColor1');
const dotsGradientColor2 = document.getElementById('dotsGradientColor2');
const bgColor = document.getElementById('bgColor');
const transparentBg = document.getElementById('transparentBg');
const size = document.getElementById('size');
const sizeValue = document.getElementById('sizeValue');
const errorCorrection = document.getElementById('errorCorrection');
const logoUpload = document.getElementById('logoUpload');
const removeMargin = document.getElementById('removeMargin');
const qrCodeElement = document.getElementById('qrcode');
const barcodeElement = document.getElementById('barcode');
const downloadBtn = document.getElementById('downloadBtn');

// Toggle gradient colors visibility
dotsGradient.addEventListener('change', function() {
    dotsGradientColors.style.display = this.checked ? 'block' : 'none';
    updateCode();
});

// Handle logo upload
logoUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            qrCode.update({
                image: e.target.result,
                imageOptions: {
                    crossOrigin: "anonymous",
                    margin: removeMargin.checked ? 0 : 10
                }
            });
        };
        reader.readAsDataURL(file);
    }
});

// Handle logo margin
removeMargin.addEventListener('change', function() {
    if (logoUpload.files[0]) {
        qrCode.update({
            imageOptions: {
                margin: this.checked ? 0 : 10
            }
        });
    }
});

// Input field templates
const inputTemplates = {
    'qr-url': `
        <div class="input-group">
            <label class="block text-gray-700 font-semibold mb-2">Enter URL</label>
            <input type="url" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                   placeholder="https://example.com">
        </div>
    `,
    'qr-text': `
        <div class="input-group">
            <label class="block text-gray-700 font-semibold mb-2">Enter Text</label>
            <textarea class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      rows="3" placeholder="Enter your text here"></textarea>
        </div>
    `,
    'qr-tel': `
        <div class="input-group">
            <label class="block text-gray-700 font-semibold mb-2">Enter Phone Number</label>
            <input type="tel" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                   placeholder="+1234567890">
        </div>
    `,
    'qr-sms': `
        <div class="space-y-4">
            <div class="input-group">
                <label class="block text-gray-700 font-semibold mb-2">Phone Number</label>
                <input type="tel" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                       placeholder="+1234567890">
            </div>
            <div class="input-group">
                <label class="block text-gray-700 font-semibold mb-2">Message</label>
                <textarea class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          rows="2" placeholder="Enter message"></textarea>
            </div>
        </div>
    `,
    'qr-email': `
        <div class="space-y-4">
            <div class="input-group">
                <label class="block text-gray-700 font-semibold mb-2">Email Address</label>
                <input type="email" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                       placeholder="example@email.com">
            </div>
            <div class="input-group">
                <label class="block text-gray-700 font-semibold mb-2">Subject</label>
                <input type="text" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                       placeholder="Email subject">
            </div>
            <div class="input-group">
                <label class="block text-gray-700 font-semibold mb-2">Message</label>
                <textarea class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          rows="2" placeholder="Email body"></textarea>
            </div>
        </div>
    `,
    'qr-wifi': `
        <div class="space-y-4">
            <div class="input-group">
                <label class="block text-gray-700 font-semibold mb-2">Network Name (SSID)</label>
                <input type="text" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                       placeholder="WiFi Network Name">
            </div>
            <div class="input-group">
                <label class="block text-gray-700 font-semibold mb-2">Password</label>
                <input type="password" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                       placeholder="WiFi Password">
            </div>
            <div class="input-group">
                <label class="block text-gray-700 font-semibold mb-2">Encryption</label>
                <select class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">No Encryption</option>
                </select>
            </div>
        </div>
    `,
    'qr-vcard': `
        <div class="space-y-4">
            <div class="input-group">
                <label class="block text-gray-700 font-semibold mb-2">Full Name</label>
                <input type="text" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                       placeholder="John Doe">
            </div>
            <div class="input-group">
                <label class="block text-gray-700 font-semibold mb-2">Phone</label>
                <input type="tel" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                       placeholder="+1234567890">
            </div>
            <div class="input-group">
                <label class="block text-gray-700 font-semibold mb-2">Email</label>
                <input type="email" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                       placeholder="john@example.com">
            </div>
            <div class="input-group">
                <label class="block text-gray-700 font-semibold mb-2">Organization</label>
                <input type="text" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                       placeholder="Company Name">
            </div>
            <div class="input-group">
                <label class="block text-gray-700 font-semibold mb-2">Address</label>
                <textarea class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          rows="2" placeholder="Street, City, Country"></textarea>
            </div>
        </div>
    `,
    'default-barcode': `
        <div class="input-group">
            <label class="block text-gray-700 font-semibold mb-2">Enter Value</label>
            <input type="text" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                   placeholder="Enter barcode value">
        </div>
    `
};

// Update input fields based on code type
codeType.addEventListener('change', function() {
    const type = this.value;
    const isQR = type.startsWith('qr-');
    
    // Show/hide QR specific options
    qrStyleOptions.style.display = isQR ? 'block' : 'none';
    
    // Update input fields
    if (isQR) {
        inputFields.innerHTML = inputTemplates[type];
        qrCodeElement.style.display = 'block';
        barcodeElement.style.display = 'none';
    } else {
        inputFields.innerHTML = inputTemplates['default-barcode'];
        qrCodeElement.style.display = 'none';
        barcodeElement.style.display = 'block';
    }
    
    updateCode();
});

// Update code when inputs change
inputFields.addEventListener('input', updateCode);
dotsStyle.addEventListener('change', updateCode);
cornerSquaresStyle.addEventListener('change', updateCode);
cornerDotsStyle.addEventListener('change', updateCode);
dotsColor.addEventListener('input', updateCode);
dotsGradientColor1.addEventListener('input', updateCode);
dotsGradientColor2.addEventListener('input', updateCode);
bgColor.addEventListener('input', updateCode);
transparentBg.addEventListener('change', updateCode);
size.addEventListener('input', updateCode);
errorCorrection.addEventListener('change', updateCode);

// Update size value display
size.addEventListener('input', function() {
    sizeValue.textContent = this.value;
});

// Function to generate QR code data based on type
function generateQRData() {
    const type = codeType.value;
    const inputs = inputFields.querySelectorAll('input, textarea, select');
    let data = '';

    switch(type) {
        case 'qr-url':
            data = inputs[0].value || 'https://mmssb.github.io/QReator.com';
            break;
        case 'qr-text':
            data = inputs[0].value || 'Sample Text';
            break;
        case 'qr-tel':
            data = `tel:${inputs[0].value || '+1234567890'}`;
            break;
        case 'qr-sms':
            data = `smsto:${inputs[0].value}:${inputs[1].value}`;
            break;
        case 'qr-email':
            data = `mailto:${inputs[0].value}?subject=${inputs[1].value}&body=${inputs[2].value}`;
            break;
        case 'qr-wifi':
            data = `WIFI:T:${inputs[2].value};S:${inputs[0].value};P:${inputs[1].value};;`;
            break;
        case 'qr-vcard':
            data = `BEGIN:VCARD
VERSION:3.0
FN:${inputs[0].value}
TEL:${inputs[1].value}
EMAIL:${inputs[2].value}
ORG:${inputs[3].value}
ADR:;;${inputs[4].value};;;
END:VCARD`;
            break;
        default:
            data = inputs[0].value || '';
    }
    return data;
}

// Update code
function updateCode() {
    const type = codeType.value;
    const newSize = parseInt(size.value);
    const backgroundColor = transparentBg.checked ? 'transparent' : bgColor.value;

    if (type.startsWith('qr-')) {
        // Update QR Code
        const dotsColorValue = dotsGradient.checked ? 
            {
                type: 'gradient',
                gradient: {
                    type: 'linear',
                    rotation: 0,
                    colorStops: [
                        { offset: 0, color: dotsGradientColor1.value },
                        { offset: 1, color: dotsGradientColor2.value }
                    ]
                }
            } : 
            dotsColor.value;

        qrCode.update({
            width: newSize,
            height: newSize,
            data: generateQRData(),
            dotsOptions: {
                color: dotsColorValue,
                type: dotsStyle.value
            },
            cornersSquareOptions: {
                type: cornerSquaresStyle.value,
                color: dotsColorValue
            },
            cornersDotOptions: {
                type: cornerDotsStyle.value,
                color: dotsColorValue
            },
            backgroundOptions: {
                color: backgroundColor
            },
            qrOptions: {
                errorCorrectionLevel: errorCorrection.value
            }
        });
        
        // Clear any existing QR code and append new one
        qrCodeElement.innerHTML = '';
        qrCode.append(qrCodeElement);
    } else {
        // Update Barcode
        const input = inputFields.querySelector('input').value || '0000000000000';
        JsBarcode("#barcode", input, {
            format: type,
            width: 2,
            height: newSize,
            displayValue: true,
            lineColor: dotsColor.value,
            background: backgroundColor
        });
    }
}

// Download code
downloadBtn.addEventListener('click', function() {
    const type = codeType.value;
    if (type.startsWith('qr-')) {
        qrCode.download({
            extension: 'png'
        });
    } else {
        // Create a temporary link to download the SVG
        const svgData = new XMLSerializer().serializeToString(barcodeElement);
        const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = "barcode.svg";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(svgUrl);
    }
});

// Initial update
qrCode.append(document.getElementById('qrcode'));
updateCode();
