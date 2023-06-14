
        // background toggle
        const bgToggle = document.getElementById('bg-toggle');
        bgToggle.addEventListener('click', () => {
            document.querySelector("#bill-pad").classList.toggle('bill-pad-bg');
        });

        // address placeholder
        const addressElement = document.getElementById("address");
        const placeholderText = "Company Address";


        addressElement.addEventListener("focus", function () {
            if (this.textContent === placeholderText) {
                this.textContent = "";
                addressElement.classList.remove("blur-text");
            }
        });

        addressElement.addEventListener("blur", function () {
            if (this.textContent === "") {
                this.textContent = placeholderText;
                addressElement.classList.add("blur-text");
            }
        });

        if (addressElement.textContent === "") {
            addressElement.textContent = placeholderText;
        }
        // hide panel
        const hide = document.getElementById('hide');
        hide.addEventListener('click', () => {
            // toggle panel visibility
            document.querySelector('#panel').classList.toggle('hidden');
        })
        // upload button
        const fileInput = document.getElementById('set-logo');
        //  label as upload button
        const uploadButton = document.getElementById('upload-button');
        const logoImg = document.getElementById('logo');

        uploadButton.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            // convert file to base64
            const reader = new FileReader();

            reader.addEventListener('load', () => {
                logoImg.src = reader.result;
            });

            reader.readAsDataURL(file);
        });

        // add item
        const addItem = document.querySelector("#add-item");

        addItem.addEventListener("click", () => {
            let bill = document.querySelector("#bill");
            let tr = document.createElement("tr");
            
            let itemBox = document.createElement("input");
            let itemWrap = document.createElement("td");
            let priceBox = document.createElement("input");
            let priceWrap = document.createElement("td");
            // set tr class to .item-row
            tr.setAttribute("class", "item-row");
            // set itemBox type to text
            itemBox.setAttribute("type", "text");
            // set priceBox type to number
            priceBox.setAttribute("type", "number");
            // set itemBox class to item
            itemBox.setAttribute("class", "item");
            // set priceBox class to price
            priceBox.setAttribute("class", "price");
            // set itemBox placeholder to item
            itemBox.setAttribute("placeholder", "item");
            // set priceBox placeholder to price
            priceBox.setAttribute("placeholder", "price");
            itemWrap.append(itemBox);
            priceWrap.append(priceBox);
            // append itemBox and priceBox to tr
            tr.append(itemWrap);
            tr.append(priceWrap);
            bill.appendChild(tr);

        });
        // Remove item
        const removeItem = document.querySelector("#remove-item");
        removeItem.addEventListener("click", () => {
            let bill = document.querySelector("#bill");
        //   Remove last row
    //    make sure the last child row has the class .item-row
            if (bill.lastChild.classList.contains("item-row")) {
                bill.removeChild(bill.lastChild);
            }

        })

        // calculate total
        const totalBtn = document.querySelector("#total");
        totalBtn.addEventListener("click", () => {
            let bill = document.querySelector("#bill");
            let priceList = document.querySelectorAll(".price");
            // calculate the total of all the values of price class
            let totalValue = 0;
            priceList.forEach((bill) => {
                totalValue += parseInt(bill.value);

            })
            console.log(totalValue);
            // create row
            let tr = document.createElement("tr");
            tr.setAttribute("id", "total-row");
            // create td
            let td = document.createElement("td");
            // create td for rext total
            let td2 = document.createElement("td");
            // set text to total
            td2.innerHTML = "Total";
            // set td class to total
            td2.setAttribute("class", "total");

            // append td to tr

            tr.append(td2);


            // set td class to total
            td.setAttribute("id", "total-value");
            // set td value to total
            td.innerHTML = totalValue;
            // append td to tr
            tr.append(td);
            bill.append(tr);
            // disabling addItem removeItem and total after total is clicked

            addItem.setAttribute("disabled","true");
            removeItem.setAttribute("disabled","true");
            totalBtn.setAttribute("disabled","true");
        })

        // download
        const dl_button = document.getElementById("download-button");

        dl_button.addEventListener("click", () => {

            // Choose the element that your content will be rendered to.
            const element = document.getElementById("bill-pad");
            // Choose the element and save the PDF for your user.
            // html2pdf().from(element).save();

            // options
            // var opt = {
            //   margin: 1,
            //   filename: "myfile.pdf",
            //   image: { type: "jpeg", quality: 0.98 },
            //   html2canvas: { scale: 2 },
            //   jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
            // };
            //
            // Choose the element and save the PDF for your user.
            html2pdf()
                .set({
                    html2canvas: { scale: 4 },
                    // jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
                    // jsPDF: {
                    //     unit: "px",
                    //     format: "letter",
                    //     orientation: "portrait",
                    //     compressPDF: true,
                    //     fontSize: 16,

                    // },
                    filename: "Bill.pdf"
                })
                .from(element)
                .save();

        });  
    