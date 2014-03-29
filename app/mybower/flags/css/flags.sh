#!/bin/sh
echo "/*List of world flags */" > flags.css
for i in icon small large medium
do
    for img in $i/*.png
    do
        country=`basename $img .png`
        dimension=`identify $img |awk '{print \$3}'`
        width=`echo $dimension | awk -F 'x' '{print \$1}'`
        height=`echo $dimension | awk -F 'x' '{print \$2}'`
        echo ".${country}-${i}{background-image:url(\"${img}\");display:inline-block;height:${height}px;width:${width}px;}" >>flags.css
    done
done
