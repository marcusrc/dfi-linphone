import assert = require("assert");
import Linphone = require("../src/linphone");
import ChildrenManager = require("../src/childrenManager");

describe("linphone", () => {
    function onBefore(done) {
        this.timeout(0);
        done();
    }

    function onCreate(done) {
        this.timeout(0);
        const linphone = new Linphone({
            host: "pbx",
            password: "seivieb",
            port: 5061,
            rtpPort: 7078,
            sip: 154,
            technology: "SIP"
        });

        linphone.once(Linphone.events.REGISTERED, () => {
            linphone.once(Linphone.events.CLOSE, () => {
                done();
            });
            ChildrenManager.terminate();
        });
        linphone.on(Linphone.events.ERROR, (err) => {
            throw err;
        });
    }

    before(onBefore);

    it("create 1", onCreate);
    it("create 2", onCreate);

    it("manager", (done) => {
        assert.equal(ChildrenManager.length, 0);
        assert.equal(ChildrenManager.children.size, 0);

        done();
    });

});
