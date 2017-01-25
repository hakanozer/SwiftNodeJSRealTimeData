//
//  ViewController.swift
//  SocketRealTimeTableView
//
//  Created by Hakan on 1/22/17.
//  Copyright © 2017 Hakan. All rights reserved.
//

import UIKit
import SocketIO
import SwiftyJSON

class ViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {

    
    var gelenJS: JSON? = []
    var resetAck: SocketAckEmitter?
    var socket: SocketIOClient?
    var baglantiID: UUID?
    @IBOutlet weak var tableView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.tableView.delegate = self
        self.tableView.dataSource = self
    }
    
    
    
    override func viewDidAppear(_ animated: Bool) {
        
        #if (arch(i386) || arch(x86_64))
            socket = SocketIOClient(socketURL: URL(string: "http://localhost:3000")!, config: [.forcePolling(true)])
            islem()
            socket!.connect()
        #else
            promptUserOnDevice()
        #endif
        
    }

    
    func islem() {
        print(socket!)
        baglantiID = socket?.on("connect") { ( data:Array, ack:SocketAckEmitter) in
            
            print("Bağlantı Sağlandı")
            print("baglantiID: \(self.baglantiID!)")
            
            self.socket?.emitWithAck("event_name", "Send Client").timingOut(after: 0) {data in
                print("event_name çalıştı")
                self.socket?.emit("update", ["amount": 1.0 + 2.50])
            }
            ack.with("Got your currentAmount", "dude")
        }
        
        self.socket?.on("name") {[weak self] data, ack in
            print("data yeniden geldi")
            let calisJS = JSON(data[0])
            print("Gelen Data : \(calisJS)")
            self?.gelenJS = calisJS["yeniVeri"]
            self?.tableView.reloadData()
        }

    }

    
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }

    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return (self.gelenJS?.count)!
    }
    
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
        cell.detailTextLabel?.text = self.gelenJS?[indexPath.row]["soyadi"].string
        cell.textLabel?.text = self.gelenJS?[indexPath.row]["adi"].string
        return cell
    }
    

    
    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
}

